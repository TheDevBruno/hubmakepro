import { cookies } from 'next/headers'
import { DollarSign, TrendingUp, Users, CreditCard, Banknote, QrCode } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export default async function FinancialPage() {
  const supabase = await createClient()
  const cookieStore = await cookies()
  const currentOrgId = cookieStore.get('current_org_id')?.value

  // Busca transações do tenant
  const { data: transactions } = currentOrgId
    ? await supabase
        .from('financial_transactions')
        .select(`
          id, gross_amount_cents, commission_amount_cents, net_amount_cents,
          payment_method, status, created_at,
          clients(name),
          specialists(name),
          services(name)
        `)
        .eq('organization_id', currentOrgId)
        .order('created_at', { ascending: false })
    : { data: [] }

  // Totalizadores
  const totalGross = (transactions || []).reduce((acc, t) => acc + t.gross_amount_cents, 0)
  const totalCommission = (transactions || []).reduce((acc, t) => acc + t.commission_amount_cents, 0)
  const totalNet = (transactions || []).reduce((acc, t) => acc + t.net_amount_cents, 0)

  const paymentMethodIcons: Record<string, { label: string; icon: any }> = {
    pix: { label: 'Pix', icon: QrCode },
    credit_card: { label: 'Cartão de Crédito', icon: CreditCard },
    debit_card: { label: 'Cartão de Débito', icon: CreditCard },
    cash: { label: 'Dinheiro', icon: Banknote },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-400" />
            Caixa Operacional & Fechamento de Comissões
          </h1>
          <p className="text-xs text-slate-400">
            Faturamento em tempo real, repasses calculados aos profissionais e entradas por método de pagamento
          </p>
        </div>
      </div>

      {/* Cards de Métricas Financeiras */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-5 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Faturamento Bruto Total
          </span>
          <p className="text-2xl font-black text-white mt-1">
            {(totalGross / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Total de procedimentos recebidos</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-5 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
            Comissões dos Especialistas
          </span>
          <p className="text-2xl font-black text-amber-400 mt-1">
            {(totalCommission / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Repasses calculados para a equipe</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-5 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            Lucro Líquido do Salão
          </span>
          <p className="text-2xl font-black text-emerald-400 mt-1">
            {(totalNet / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Retenção após dedução de comissões</p>
        </div>
      </div>

      {/* Tabela de Transações */}
      <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-6 shadow-md">
        <h2 className="text-sm font-bold text-white mb-4">Extrato de Comandas e Pagamentos</h2>

        {transactions && transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="border-b border-slate-800 text-slate-400 font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Data</th>
                  <th className="py-2.5 px-3">Serviço / Cliente</th>
                  <th className="py-2.5 px-3">Profissional</th>
                  <th className="py-2.5 px-3">Pagamento</th>
                  <th className="py-2.5 px-3 text-right">Bruto</th>
                  <th className="py-2.5 px-3 text-right text-amber-400">Comissão</th>
                  <th className="py-2.5 px-3 text-right text-emerald-400">Líquido Salão</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {transactions.map((t: any) => {
                  const client = Array.isArray(t.clients) ? t.clients[0] : t.clients
                  const specialist = Array.isArray(t.specialists) ? t.specialists[0] : t.specialists
                  const service = Array.isArray(t.services) ? t.services[0] : t.services
                  const method = paymentMethodIcons[t.payment_method] || { label: t.payment_method, icon: DollarSign }

                  return (
                    <tr key={t.id} className="hover:bg-slate-800/30">
                      <td className="py-2.5 px-3 text-slate-400">
                        {new Date(t.created_at).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="font-semibold text-white block">{service?.name || 'Procedimento'}</span>
                        <span className="text-[11px] text-slate-400">{client?.name || 'Cliente Avulsa'}</span>
                      </td>
                      <td className="py-2.5 px-3 font-medium text-slate-200">
                        {specialist?.name || 'Profissional'}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-semibold">
                          {method.label}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-white">
                        {(t.gross_amount_cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </td>
                      <td className="py-2.5 px-3 text-right font-semibold text-amber-400">
                        {(t.commission_amount_cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </td>
                      <td className="py-2.5 px-3 text-right font-semibold text-emerald-400">
                        {(t.net_amount_cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-sm text-slate-400">Nenhum pagamento registrado ainda.</p>
            <p className="text-xs text-slate-500 mt-1">
              Conclua atendimentos na Agenda para apurar recebimentos e comissões automaticamente.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
