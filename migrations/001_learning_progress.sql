CREATE TABLE IF NOT EXISTS public.learning_progress (
  user_id uuid NOT NULL REFERENCES neon_auth."user"(id) ON DELETE CASCADE,
  kind text NOT NULL CHECK (kind IN ('lesson', 'question')),
  content_id text NOT NULL CHECK (length(content_id) BETWEEN 1 AND 100),
  completed boolean NOT NULL DEFAULT false,
  solved boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, kind, content_id)
);
-- statement
ALTER TABLE public.learning_progress ENABLE ROW LEVEL SECURITY;
-- statement
ALTER TABLE public.learning_progress FORCE ROW LEVEL SECURITY;
-- statement
CREATE POLICY own_progress ON public.learning_progress
  FOR ALL TO it_worlds_app
  USING (user_id = NULLIF(current_setting('app.user_id', true), '')::uuid)
  WITH CHECK (user_id = NULLIF(current_setting('app.user_id', true), '')::uuid);
-- statement
GRANT USAGE ON SCHEMA public TO it_worlds_app;
-- statement
GRANT SELECT, INSERT, UPDATE, DELETE ON public.learning_progress TO it_worlds_app;
