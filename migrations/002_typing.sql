CREATE TABLE public.typing_profiles (
 user_id uuid PRIMARY KEY REFERENCES neon_auth."user"(id) ON DELETE CASCADE,
 display_name text NOT NULL DEFAULT '' CHECK (length(display_name)<=24 AND display_name ~ '^[[:alnum:] _-]*$'),
 visible boolean NOT NULL DEFAULT false,
 CHECK (NOT visible OR length(display_name)>=2)
);
-- statement
CREATE UNIQUE INDEX typing_display_name ON public.typing_profiles(lower(display_name)) WHERE display_name<>'';
-- statement
CREATE TABLE public.typing_runs (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 user_id uuid NOT NULL REFERENCES neon_auth."user"(id) ON DELETE CASCADE,
 mode text NOT NULL CHECK (mode IN ('practice','ranked')),
 locale text NOT NULL CHECK (locale IN ('de','en')),
 lesson text NOT NULL CHECK(length(lesson) BETWEEN 1 AND 32),
 target text NOT NULL CHECK(length(target) BETWEEN 1 AND 4000),
 started_at timestamptz NOT NULL DEFAULT clock_timestamp(),
 ended_at timestamptz,
 duration integer CHECK(duration BETWEEN 1 AND 60000),
 characters integer CHECK(characters BETWEEN 0 AND 1200),
 wpm double precision CHECK(wpm BETWEEN 0 AND 15000),
 kpm double precision CHECK(kpm BETWEEN 0 AND 75000),
 accuracy double precision CHECK(accuracy BETWEEN 0 AND 100),
 weakness jsonb NOT NULL DEFAULT '{}',
 eligible boolean NOT NULL DEFAULT false
);
-- statement
CREATE INDEX typing_recent ON public.typing_runs(user_id,started_at DESC);
-- statement
CREATE INDEX typing_ranked ON public.typing_runs(locale,ended_at DESC) WHERE eligible;
-- statement
ALTER TABLE public.typing_profiles ENABLE ROW LEVEL SECURITY;
-- statement
ALTER TABLE public.typing_profiles FORCE ROW LEVEL SECURITY;
-- statement
ALTER TABLE public.typing_runs ENABLE ROW LEVEL SECURITY;
-- statement
ALTER TABLE public.typing_runs FORCE ROW LEVEL SECURITY;
-- statement
CREATE POLICY own_typing_profile ON public.typing_profiles FOR ALL TO it_worlds_app
 USING(user_id=NULLIF(current_setting('app.user_id',true),'')::uuid)
 WITH CHECK(user_id=NULLIF(current_setting('app.user_id',true),'')::uuid);
-- statement
CREATE POLICY own_typing_runs ON public.typing_runs FOR ALL TO it_worlds_app
 USING(user_id=NULLIF(current_setting('app.user_id',true),'')::uuid)
 WITH CHECK(user_id=NULLIF(current_setting('app.user_id',true),'')::uuid);
-- statement
GRANT SELECT,INSERT,UPDATE ON public.typing_profiles,public.typing_runs TO it_worlds_app;
-- statement
CREATE FUNCTION public.typing_board(p_locale text,p_period text,p_metric text)
RETURNS TABLE(display_name text,wpm double precision,kpm double precision,accuracy double precision)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path='' AS $$
 WITH candidates AS (
  SELECT p.display_name,r.wpm,r.kpm,r.accuracy,r.ended_at,r.id,
   CASE p_metric WHEN 'accuracy' THEN r.accuracy WHEN 'kpm' THEN r.kpm ELSE r.wpm END AS metric,
   row_number() OVER(PARTITION BY r.user_id ORDER BY
    CASE p_metric WHEN 'accuracy' THEN r.accuracy WHEN 'kpm' THEN r.kpm ELSE r.wpm END DESC,
    r.wpm DESC,r.accuracy DESC,r.ended_at ASC,r.id ASC) AS position
  FROM public.typing_runs r JOIN public.typing_profiles p ON p.user_id=r.user_id
  WHERE r.eligible AND r.mode='ranked' AND p.visible AND r.locale=p_locale
   AND p_locale IN ('de','en') AND p_period IN ('day','week','month','all') AND p_metric IN ('wpm','kpm','accuracy')
   AND r.ended_at>=CASE p_period
    WHEN 'day' THEN date_trunc('day',now() AT TIME ZONE 'UTC') AT TIME ZONE 'UTC'
    WHEN 'week' THEN date_trunc('week',now() AT TIME ZONE 'UTC') AT TIME ZONE 'UTC'
    WHEN 'month' THEN date_trunc('month',now() AT TIME ZONE 'UTC') AT TIME ZONE 'UTC'
    ELSE '-infinity'::timestamptz END
 ) SELECT c.display_name,c.wpm,c.kpm,c.accuracy FROM candidates c WHERE c.position=1
 ORDER BY c.metric DESC,c.wpm DESC,c.accuracy DESC,c.ended_at ASC,c.id ASC LIMIT 50;
$$;
-- statement
REVOKE ALL ON FUNCTION public.typing_board(text,text,text) FROM PUBLIC;
-- statement
GRANT EXECUTE ON FUNCTION public.typing_board(text,text,text) TO it_worlds_app;
