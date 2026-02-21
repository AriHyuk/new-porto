import { getPublishedPosts } from '@/actions/get-posts';
import PostCard from '@/components/Blog/PostCard';
import Link from 'next/link';
import { Metadata } from 'next';
import { FaArrowLeft } from 'react-icons/fa';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Blog & Writing | Ari Awaludin',
  description: 'Technical articles, thoughts on software engineering, and learnings from building real-world products.',
  openGraph: {
    title: 'Blog & Writing | Ari Awaludin',
    description: 'Technical articles, thoughts on software engineering, and learnings from building real-world products.',
  },
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#030712] pt-32 pb-24 px-4 transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-12 group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>

        {/* Header */}
        <div className="mb-16 md:mb-24">
          <span className="text-blue-500 font-black uppercase tracking-[0.5em] text-[9px] md:text-[10px] mb-4 block">
            Writing
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-b from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-gray-300 dark:to-gray-600 bg-clip-text text-transparent leading-[0.9] mb-6">
            Blog &amp; <span className="text-blue-600 dark:text-blue-500">Articles</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl text-base md:text-lg leading-relaxed font-medium">
            Technical writing on software engineering, architecture decisions, and learnings from the field.
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-32">
            <div className="text-6xl mb-6 opacity-30">✍️</div>
            <p className="text-gray-400 font-medium text-lg">No articles yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
