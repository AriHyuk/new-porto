'use client';

import { useState, useTransition } from 'react';
import { getAllPostsAdmin } from '@/actions/get-posts';
import { togglePostPublish, deletePost } from '@/app/admin/posts/actions';
import Link from 'next/link';
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

interface Post {
  id: string;
  title: string;
  slug: string;
  is_published: boolean;
  view_count: number;
  published_at: string | null;
  created_at: string;
  tags: string[];
}

interface PostsListClientProps {
  initialPosts: Post[];
}

export default function PostsListClient({ initialPosts }: PostsListClientProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [isPending, startTransition] = useTransition();

  const handleToggle = (id: string, currentStatus: boolean) => {
    startTransition(async () => {
      try {
        await togglePostPublish(id, currentStatus);
        setPosts((prev) =>
          prev.map((p) =>
            p.id === id
              ? { ...p, is_published: !currentStatus, published_at: !currentStatus ? new Date().toISOString() : null }
              : p
          )
        );
        toast.success(!currentStatus ? 'Post published!' : 'Post unpublished');
      } catch {
        toast.error('Failed to update post');
      }
    });
  };

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    startTransition(async () => {
      try {
        await deletePost(id);
        setPosts((prev) => prev.filter((p) => p.id !== id));
        toast.success('Post deleted');
      } catch {
        toast.error('Failed to delete post');
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Blog Posts</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{posts.length} articles total</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          <FaPlus /> New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No posts yet. Create your first article!</div>
      ) : (
        <div className="rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-gray-600 dark:text-gray-400">Title</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Tags</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Views</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-right px-6 py-3 font-semibold text-gray-600 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              {posts.map((post) => (
                <tr key={post.id} className="bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900 dark:text-white line-clamp-1">{post.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">/blog/{post.slug}</p>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {post.tags?.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-500 dark:text-gray-400">{post.view_count ?? 0}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-2.5 py-1 text-[10px] font-black uppercase rounded-full ${post.is_published ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-gray-100 text-gray-500 dark:bg-zinc-700 dark:text-gray-400'}`}>
                      {post.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleToggle(post.id, post.is_published)}
                        disabled={isPending}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-500 hover:text-blue-600 transition-colors"
                        title={post.is_published ? 'Unpublish' : 'Publish'}
                      >
                        {post.is_published ? <FaEyeSlash /> : <FaEye />}
                      </button>
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-500 hover:text-indigo-600 transition-colors"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        disabled={isPending}
                        className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
