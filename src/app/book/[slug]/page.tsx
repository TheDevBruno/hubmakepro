import { notFound } from 'next/navigation'
import { Sparkles, MapPin, Phone, Instagram } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { BookingForm } from './booking-form'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function PublicBookingPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  // 1. Busca dados da organização pelo slug
  const { data: org, error: orgError } = await supabase
    .from('organizations')
    .select('id, name, slug')
    .eq('slug', slug)
    .single()

  if (orgError || !org) {
    notFound()
  }

  // 2. Busca serviços ativos
  const { data: services } = await supabase
    .from('services')
    .select('id, name, duration_minutes, price_cents, category')
    .eq('organization_id', org.id)
    .eq('is_active', true)
    .order('category', { ascending: true })

  // 3. Busca especialistas ativos
  const { data: specialists } = await supabase
    .from('specialists')
    .select('id, name, specialties')
    .eq('organization_id', org.id)
    .eq('is_active', true)
    .order('name', { ascending: true })

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 py-10 px-4">
      <div className="max-w-xl mx-auto space-y-8">
        {/* Header do Espaço / Salão */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-tr from-pink-600 via-purple-600 to-blue-600 text-white font-black text-xl shadow-xl shadow-pink-600/20 mb-2">
            {org.name.charAt(0)}
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">{org.name}</h1>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Agende seu horário online em poucos cliques. Escolha o serviço, especialista e horário ideal para você.
          </p>
        </div>

        {/* Formulário Interativo */}
        <BookingForm
          orgSlug={org.slug}
          orgName={org.name}
          services={services || []}
          specialists={specialists || []}
        />

        {/* Footer do Agendamento */}
        <div className="text-center text-[11px] text-slate-600">
          Powered by <strong className="text-slate-400">Hub MakePro</strong> • Plataforma de Gestão de Beleza
        </div>
      </div>
    </div>
  )
}
