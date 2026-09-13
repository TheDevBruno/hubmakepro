'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signup } from '@/app/actions/auth'

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const result = await signup(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-[#090d16]">
      <div className="w-full max-w-md rounded-2xl bg-[#0f172a] border border-slate-800 p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-xl mb-3 shadow-lg shadow-blue-500/20">
            H
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Criar Nova Conta</h1>
          <p className="text-sm text-slate-400 mt-1">Inicie no Hub MakePro em poucos passos</p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-950/50 border border-red-800 p-3 text-sm text-red-200 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Nome Completo
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              placeholder="Seu Nome"
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              E-mail Corporativo
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="seu.email@empresa.com"
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Senha de Acesso (Mín. 6 caracteres)
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 hover:bg-blue-500 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Criando Conta...' : 'Cadastrar e Começar'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          Já possui cadastro?{' '}
          <Link href="/login" className="font-semibold text-blue-400 hover:text-blue-300 underline">
            Fazer login
          </Link>
        </div>
      </div>
    </div>
  )
}
