# Server Actions - Usage Guide

## `getProjects()`

Fetch all projects from Supabase database.

### Import
```typescript
import { getProjects } from '@/app/actions/get-projects';
```

### Usage in Server Component

```tsx
// app/projects/page.tsx
import { getProjects } from '@/app/actions/get-projects';

export default async function ProjectsPage() {
  const projects = await getProjects();

  if (projects.length === 0) {
    return <div>No projects found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div key={project.id} className="border rounded-lg p-4">
          <h2 className="text-xl font-bold">{project.title}</h2>
          <p className="text-gray-600">{project.description}</p>
          
          {project.tech_stack && (
            <div className="flex gap-2 mt-2">
              {project.tech_stack.map((tech) => (
                <span key={tech} className="bg-blue-100 px-2 py-1 rounded text-sm">
                  {tech}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex gap-4 mt-4">
            {project.demo_url && (
              <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                Demo
              </a>
            )}
            {project.repo_url && (
              <a href={project.repo_url} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Features

- ✅ **Error Handling**: Returns empty array `[]` if error occurs (UI won't crash)
- ✅ **Caching**: Data cached for 1 hour (`revalidate: 3600`)
- ✅ **Type Safety**: Returns `Project[]` with full TypeScript support
- ✅ **Ordered**: Projects sorted by `created_at DESC` (newest first)

### Return Type

```typescript
type Project = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  tech_stack: string[] | null;
  demo_url: string | null;
  repo_url: string | null;
  created_at: string;
}
```

### Notes

- This is a **Server Action** (`'use server'`)
- Can only be called in **Server Components** or other Server Actions
- For Client Components, you need to fetch data via Server Component props or use a different approach
