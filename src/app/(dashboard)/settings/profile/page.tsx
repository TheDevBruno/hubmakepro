import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { updateProfile } from '@/app/actions/profile'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-xl font-bold text-white">Meu Perfil</h1>
            <p className="text-xs text-slate-400">Gerencie suas credenciais e dados pessoais</p>
          </div>
          <Link
            href="/dashboard"
            className="rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-300"
          >
            ← Voltar ao Dashboard
          </Link>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-6 shadow-md">
          <form action={updateProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                E-mail (Identificador Auth)
              </label>
              <input
                type="email"
                disabled
                value={user.email || ''}
                className="w-full rounded-lg bg-slate-900/50 border border-slate-800 px-3 py-2 text-xs text-slate-500 cursor-not-allowed"
              />
              <span className="text-[11px] text-slate-500">O e-mail é gerenciado pelo provedor de autenticação.</span>
            </div>

            <div>
              <label htmlFor="fullName" className="block text-xs font-semibold text-slate-300 mb-1">
                Nome Completo
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                defaultValue={profile?.full_name || ''}
                placeholder="Seu nome completo"
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-xs font-semibold text-white transition shadow-sm"
              >
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
