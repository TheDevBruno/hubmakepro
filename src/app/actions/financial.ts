'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { requireOrgMembership } from '@/lib/auth/authorization'

export type FinancialActionResult = {
  success: boolean
  message: string
  transactionId?: string
}

export type PaymentMethod = 'pix' | 'credit_card' | 'debit_card' | 'cash'

/**
 * Conclui um agendamento, apura a comissão do especialista e registra o pagamento com validação server-side (financial:manage).
 */
export async function closeAppointmentAndPay(
  appointmentId: string,
  paymentMethod: PaymentMethod,
  customAmountCents?: number
): Promise<FinancialActionResult> {
  const supabase = await createClient()

  // 1. Validação estrita server-side de autorização e organização ativa
  let orgId: string
  try {
    const authContext = await requireOrgMembership(supabase, null, 'financial:manage')
    orgId = authContext.orgId
  } catch (err: any) {
    return { success: false, message: err?.message || 'Acesso não autorizado ao financeiro.' }
  }

  // 2. Busca os detalhes do agendamento garantindo isolamento de tenant
  const { data: apt, error: aptError } = await supabase
    .from('appointments')
    .select(`
      id, organization_id, client_id, specialist_id, service_id, price_cents,
      specialists(commission_rate)
    `)
    .eq('id', appointmentId)
    .eq('organization_id', orgId)
    .single()

  if (aptError || !apt) {
    return { success: false, message: 'Agendamento não encontrado nesta organização.' }
  }

  const grossAmount = customAmountCents ?? apt.price_cents
  const specialist = Array.isArray(apt.specialists) ? apt.specialists[0] : apt.specialists
  const commissionRate = specialist?.commission_rate ?? 50

  const commissionAmount = Math.round((grossAmount * commissionRate) / 100)
  const netAmount = grossAmount - commissionAmount

  // 3. Insere a transação financeira
  const { data: tx, error: txError } = await supabase
    .from('financial_transactions')
    .insert({
      organization_id: orgId,
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

  // 4. Atualiza o agendamento para concluído
  await supabase
    .from('appointments')
    .update({ status: 'completed', updated_at: new Date().toISOString() })
    .eq('id', appointmentId)
    .eq('organization_id', orgId)

  revalidatePath('/appointments')
  revalidatePath('/financial')
  return { success: true, message: 'Comanda finalizada e comissão calculada com sucesso!', transactionId: tx.id }
}
