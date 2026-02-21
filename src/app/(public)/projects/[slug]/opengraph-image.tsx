import { ImageResponse } from 'next/og';
import { getProjectBySlug } from '@/actions/get-project-by-slug';

export const runtime = 'edge';
export const alt = 'Project Preview';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);

  const title = project?.title || 'Project';
  const description = project?.description?.slice(0, 120) || 'A project by Ari Awaludin';
  const techStack = project?.tech_stack?.slice(0, 5) || [];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '60px',
          background: 'linear-gradient(135deg, #0a0c10 0%, #0d1117 50%, #0f172a 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow orb top-right */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)',
          }}
        />
        {/* Glow orb bottom-left */}
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
          }}
        />

        {/* Brand */}
        <div
          style={{
            position: 'absolute',
            top: 48,
            left: 60,
            fontSize: 18,
            fontWeight: 900,
            letterSpacing: 4,
            color: '#3b82f6',
            textTransform: 'uppercase',
          }}
        >
          ARI HYUK
        </div>

        {/* Tech stack pills */}
        {techStack.length > 0 && (
          <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
            {techStack.map((tech) => (
              <span
                key={tech}
                style={{
                  padding: '6px 16px',
                  borderRadius: 999,
                  background: 'rgba(59,130,246,0.15)',
                  border: '1px solid rgba(59,130,246,0.3)',
                  color: '#93c5fd',
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: '#ffffff',
            lineHeight: 1,
            letterSpacing: -2,
            marginBottom: 20,
            maxWidth: 900,
          }}
        >
          {title}
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: 22,
            color: '#9ca3af',
            lineHeight: 1.5,
            maxWidth: 800,
            fontWeight: 500,
          }}
        >
          {description}
        </p>

        {/* Bottom label */}
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            right: 60,
            fontSize: 14,
            color: '#4b5563',
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          ariawaludin.my.id
        </div>
      </div>
    ),
    size
  );
}
