import { getPostBySlug } from '@/actions/get-posts';
import { incrementPostView } from '@/actions/increment-view';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa';

export const revalidate = 300;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | Blog — Ari Awaludin`,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      images: post.cover_image ? [post.cover_image] : [],
      type: 'article',
      publishedTime: post.published_at || post.created_at,
    },
  };
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  // Increment view in background (non-blocking)
  void incrementPostView(slug);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#030712] pt-32 pb-24 transition-colors">
      <article className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-12 group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          All Articles
        </Link>

        {/* Header */}
        <header className="mb-10">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] text-gray-900 dark:text-white mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>{formatDate(post.published_at || post.created_at)}</span>
            <span>·</span>
            <span>👁 {post.view_count ?? 0} views</span>
          </div>
        </header>

        {/* Cover Image */}
        {post.cover_image && (
          <div className="relative h-72 md:h-96 w-full rounded-2xl overflow-hidden mb-12">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        {/* Content — plaintext render; future: convert to markdown */}
        <div className="prose prose-lg prose-gray dark:prose-invert max-w-none
          prose-headings:font-black prose-headings:tracking-tight
          prose-a:text-blue-600 dark:prose-a:text-blue-400
          prose-code:text-blue-600 dark:prose-code:text-blue-400
          prose-pre:bg-gray-900 prose-pre:border prose-pre:border-white/10
        ">
          {/* Render content as plain paragraphs (markdown rendering can be added later) */}
          {post.content.split('\n').filter(Boolean).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>
    </div>
  );
}
