# Supabase setup for Write2Win

You’re using these tables: `users`, `courses`, `videos`, `user_purchases`, `user_progress`. The app uses **Supabase Auth** for login and expects your `users` table to be linked to Auth so that `user_purchases.user_id` can reference the same id as `auth.uid()`.

## 1. Env keys

In **Settings → API** in your Supabase project you’ll find:

- **Project URL** → `VITE_SUPABASE_URL`
- **anon public** key → `VITE_SUPABASE_ANON_KEY`

Put these in `.env` (copy from `.env.example`).

## 2. Link Supabase Auth to your `users` table

The app signs people up and in with **Supabase Auth** (email + password). Auth stores users in `auth.users`. Your `user_purchases` table references `users(id)`, so you need a row in `users` for each Auth user, with **the same id** as `auth.users.id`.

Run this in the Supabase SQL editor.

**Option A – Allow empty `password_hash` for Auth users (recommended)**

```sql
-- Allow password_hash to be empty for users created from Supabase Auth
ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL;
ALTER TABLE users ALTER COLUMN password_hash SET DEFAULT '';
```

**Option B – Keep `password_hash` NOT NULL**

Then set a placeholder in the trigger, e.g. `password_hash = 'supabase_auth'`.

**Trigger: create a `users` row when someone signs up with Supabase Auth**

```sql
-- Create a row in public.users when a new auth.users row is created
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, name, username, email, password_hash)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || LEFT(NEW.id::text, 8)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'password_hash', '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_auth_user();
```

If `username` must be unique and you use the same default for everyone, you could generate it from the id, e.g. `'user_' || REPLACE(NEW.id::text, '-', '')` so it’s unique per user.

## 3. Row Level Security (RLS)

So that users only see their own purchases and progress, enable RLS and add policies.

**user_purchases** – users may only read their own rows:

```sql
ALTER TABLE user_purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own purchases"
  ON user_purchases FOR SELECT
  USING (auth.uid() = user_id);
```

Insert/update/delete on `user_purchases` should be done by your backend or with the service role (e.g. after payment), not by the anon key from the frontend.

**user_progress** – users may read/update their own progress:

```sql
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own progress"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  USING (auth.uid() = user_id);
```

**courses** and **videos** – readable by everyone (so the app can list and show course/video info):

```sql
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read published courses"
  ON courses FOR SELECT
  USING (is_published = true);

ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read videos"
  ON videos FOR SELECT
  USING (true);
```

## 4. Granting access to a course (manual)

After a user has paid, add a row to `user_purchases` so they can see the course under “My Courses” and open it:

```sql
INSERT INTO user_purchases (user_id, course_id, amount_paid)
VALUES (
  'user-uuid-from-auth-users',  -- same as auth.uid() for that user
  'course-uuid-from-courses-table',
  99.00
);
```

User UUIDs are in **Authentication → Users** in the Supabase dashboard (or from `auth.uid()` after they log in). Course UUIDs are from your `courses` table.

## 5. Your tables (reference)

- **users** – id (UUID), name, username, email, password_hash; id should match `auth.users.id` for Auth users.
- **courses** – id (UUID), title, description, thumbnail_url, price, is_published, etc.
- **videos** – id, course_id (→ courses), title, description, video_url, duration_seconds, order_index, is_preview.
- **user_purchases** – user_id (→ users), course_id (→ courses); one row per purchase.
- **user_progress** – user_id, course_id, video_id, is_completed, watch_time_seconds, etc.

The app reads **courses** (published only), **videos** (by course), and **user_purchases** (by user) to show the catalog, course content, and “My Courses”.
