-- Expande organization_settings com horários de funcionamento, regras de atraso e canais de contato
ALTER TABLE public.organization_settings
ADD COLUMN IF NOT EXISTS secondary_phone TEXT,
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS maps_url TEXT,
ADD COLUMN IF NOT EXISTS business_hours JSONB NOT NULL DEFAULT '{
  "monday": {"enabled": true, "open": "09:00", "close": "19:00"},
  "tuesday": {"enabled": true, "open": "09:00", "close": "19:00"},
  "wednesday": {"enabled": true, "open": "09:00", "close": "19:00"},
  "thursday": {"enabled": true, "open": "09:00", "close": "19:00"},
  "friday": {"enabled": true, "open": "09:00", "close": "20:00"},
  "saturday": {"enabled": true, "open": "09:00", "close": "18:00"},
  "sunday": {"enabled": false, "open": "09:00", "close": "14:00"}
}'::JSONB,
ADD COLUMN IF NOT EXISTS cancellation_policy TEXT DEFAULT 'Cancelamentos com no mínimo 2h de antecedência. Tolerância de 15 minutos de atraso.';
