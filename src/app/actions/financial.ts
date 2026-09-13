'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export type FinancialActionResult = {
  success: boolean
  message: string
  transactionId?: string
}

export type PaymentMethod = 'pix' | 'credit_card' | 'debit_card' | 'cash'

/**
 * Conclui um agendamento, apura a comissão do especialista e registra o pagamento.
 */
export async function closeAppointmentAndPay(
  appointmentId: string,
  paymentMethod: PaymentMethod,
  customAmountCents?: number
): Promise<FinancialActionResult> {
  const supabase = await createClient()
  const cookieStore = await cookies()
  const currentOrgId = cookieStore.get('current_org_id')?.value

  if (!currentOrgId) {
    return { success: false, message: 'Nenhuma organização ativa selecionada.' }
  }

  // 1. Busca os detalhes do agendamento
  const { data: apt, error: aptError } = await supabase
    .from('appointments')
    .select(`
      id, organization_id, client_id, specialist_id, service_id, price_cents,
      specialists(commission_rate)
    `)
    .eq('id', appointmentId)
    .single()

  if (aptError || !apt) {
    return { success: false, message: 'Agendamento não encontrado.' }
  }

  const grossAmount = customAmountCents ?? apt.price_cents
  const specialist = Array.isArray(apt.specialists) ? apt.specialists[0] : apt.specialists
  const commissionRate = specialist?.commission_rate ?? 50

  const commissionAmount = Math.round((grossAmount * commissionRate) / 100)
  const netAmount = grossAmount - commissionAmount

  // 2. Insere a transação financeira
  const { data: tx, error: txError } = await supabase
    .from('financial_transactions')
    .insert({
      organization_id: currentOrgId,
      appointment_id: apt.id,
      specialist_id: apt.specialist_id,
      service_id: apt.service_id,
      client_id: apt.client_id,
      gross_amount_cents: grossAmount,
      commission_amount_cents: commissionAmount,
      net_amount_cents: netAmount,
      payment_method: paymentMethod,
      status: 'paid',
    })
    .select('id')
    .single()

  if (txError) {
    return { success: false, message: `Erro ao gerar pagamento: ${txError.message}` }
  }

  // 3. Atualiza o agendamento para concluído
  await supabase
    .from('appointments')
    .update({ status: 'completed', updated_at: new Date().toISOString() })
    .eq('id', appointmentId)

  revalidatePath('/appointments')
  revalidatePath('/financial')
  return { success: true, message: 'Comanda finalizada e comissão calculada com sucesso!', transactionId: tx.id }
}
