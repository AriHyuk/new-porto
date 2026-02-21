import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/actions/get-posts';

export const runtime = 'edge';
export const alt = 'Blog Post Preview';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  const title = post?.title || 'Article';
  const excerpt = post?.excerpt?.slice(0, 120) || 'by Ari Awaludin';
  const tags = post?.tags?.slice(0, 4) || [];

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
          background: 'linear-gradient(135deg, #030712 0%, #0a0c10 50%, #0c0f1a 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Purple accent glow */}
        <div
          style={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
          }}
        />

        {/* Brand + Blog label */}
        <div
          style={{
            position: 'absolute',
            top: 48,
            left: 60,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 900, letterSpacing: 4, color: '#3b82f6', textTransform: 'uppercase' }}>
            ARI HYUK
          </span>
          <span style={{ color: '#374151', fontSize: 18 }}>·</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#6b7280', letterSpacing: 3, textTransform: 'uppercase' }}>
            Blog
          </span>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '5px 14px',
                  borderRadius: 999,
                  background: 'rgba(139,92,246,0.15)',
                  border: '1px solid rgba(139,92,246,0.3)',
                  color: '#c4b5fd',
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1
          style={{
            fontSize: 60,
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

        <p style={{ fontSize: 22, color: '#9ca3af', lineHeight: 1.5, maxWidth: 800, fontWeight: 500 }}>
          {excerpt}
        </p>

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
          ariawaludin.my.id/blog
        </div>
      </div>
    ),
    size
  );
}
