
CREATE TYPE public.submission_kind AS ENUM ('message','schedule','live_support');

CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  kind public.submission_kind NOT NULL DEFAULT 'message',
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  topic TEXT,
  message TEXT,
  preferred_at TIMESTAMPTZ,
  confirmation_sent BOOLEAN NOT NULL DEFAULT false,
  founder_notified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.contact_submissions TO anon, authenticated;
GRANT ALL ON public.contact_submissions TO service_role;

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit"
ON public.contact_submissions FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(name) BETWEEN 1 AND 120
  AND length(email) BETWEEN 3 AND 255
  AND (message IS NULL OR length(message) <= 4000)
);
