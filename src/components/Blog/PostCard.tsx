import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/actions/get-posts';

interface PostCardProps {
  post: Post;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="h-full bg-white dark:bg-[#0A0C10] border border-gray-100 dark:border-white/5 rounded-[1.5rem] overflow-hidden hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 flex flex-col">
        {/* Cover Image */}
        <div className="relative h-52 bg-gradient-to-br from-blue-600/20 via-indigo-600/10 to-purple-600/20 overflow-hidden">
          {post.cover_image ? (
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-5xl opacity-30">✍️</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest bg-black/50 backdrop-blur-sm text-white rounded-full border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-3">
            {formatDate(post.published_at || post.created_at)}
          </p>
          <h3 className="text-lg font-black text-gray-900 dark:text-white mb-3 tracking-tight leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3 flex-1">
              {post.excerpt}
            </p>
          )}

          <div className="mt-5 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
            <span className="text-xs text-gray-400 dark:text-gray-500">
              👁 {post.view_count ?? 0} views
            </span>
            <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
              Read →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
