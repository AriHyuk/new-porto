# Supabase Migrations

Folder ini berisi SQL migration scripts untuk database schema.

## 📋 Available Migrations

| File | Description | Status |
|------|-------------|--------|
| `001_create_projects_table.sql` | Create projects table with RLS | ✅ Ready |

---

## 🚀 How to Run Migrations

### Method 1: Supabase Dashboard (Recommended for Manual Setup)

1. **Open Supabase Dashboard**
   - Go to: https://app.supabase.com/project/YOUR_PROJECT_ID/sql/new
   - Or navigate: `SQL Editor` → `New Query`

2. **Copy SQL Script**
   - Open file: `supabase/migrations/001_create_projects_table.sql`
   - Copy all content (Ctrl+A → Ctrl+C)

3. **Paste & Run**
   - Paste into SQL Editor
   - Click **"Run"** button (or press Ctrl+Enter)

4. **Verify Success**
   - Check output panel for success message
   - Go to `Table Editor` → You should see `projects` table
   - Go to `Authentication` → `Policies` → Verify RLS policy exists

---

### Method 2: Supabase CLI (For Automated Deployment)

```bash
# Install Supabase CLI (if not installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Run migrations
supabase db push
```

---

## ✅ Verification Steps

After running the migration, verify everything works:

### 1. Check Table Structure
```sql
-- Run in SQL Editor
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'projects'
ORDER BY ordinal_position;
```

### 2. Check RLS Policies
```sql
-- Run in SQL Editor
SELECT * FROM pg_policies WHERE tablename = 'projects';
```

### 3. Check Seed Data
```sql
-- Run in SQL Editor
SELECT * FROM public.projects;
```

Expected result: 1 row with "Portfolio Website v2" project.

---

## 🔒 Security Notes

- **RLS Enabled**: Row Level Security is enabled on `projects` table
- **Public Read**: Anyone can SELECT (read) projects
- **Authenticated Write**: Only authenticated users can INSERT/UPDATE/DELETE (commented out by default)

---

## 🐛 Troubleshooting

### Error: "relation 'projects' already exists"
- Table already created. Skip this migration or drop table first:
  ```sql
  DROP TABLE IF EXISTS public.projects CASCADE;
  ```

### Error: "permission denied"
- Make sure you're logged in as the project owner
- Check your Supabase project permissions

---

## 📝 Next Steps

After successful migration:
1. ✅ Verify table in Supabase Dashboard
2. ✅ Test query: `SELECT * FROM projects;`
3. ✅ Update `ROADMAP.md` to mark schema creation as complete
4. 🚀 Proceed to create Server Actions for data fetching
