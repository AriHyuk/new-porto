'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createPost, updatePost } from '@/app/admin/posts/actions';
import { toast } from 'react-hot-toast';
import { FaSave, FaArrowLeft, FaImage, FaTags } from 'react-icons/fa';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  tags: string[];
  is_published: boolean;
}

interface PostFormProps {
  post?: Post;
}

export default function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isEdit = !!post;

  const [title, setTitle] = useState(post?.title || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [content, setContent] = useState(post?.content || '');
  const [coverImage, setCoverImage] = useState(post?.cover_image || '');
  const [tags, setTags] = useState(post?.tags?.join(', ') || '');
  const [previewImage, setPreviewImage] = useState<string | null>(post?.cover_image || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Manually append other fields if they don't have 'name' attributes
    // or if you want to ensure they are included from state.
    // For this form, we'll rely on the 'name' attributes for title, excerpt, content, tags
    // and the file input already has name="cover_image_file".
    // The `title`, `excerpt`, `content`, `tags` states are used for controlled inputs,
    // but the `FormData` constructor will pick up the current values from the form elements
    // if they have `name` attributes. Let's add `name` attributes to the inputs.

    // If we want to use the state values directly, we can append them:
    formData.set('title', title);
    formData.set('excerpt', excerpt);
    formData.set('content', content);
    formData.set('tags', tags);
    
    startTransition(async () => {
      try {
        if (isEdit && post) {
          await updatePost(post.id, formData);
          toast.success('Post updated successfully!');
        } else {
          await createPost(formData);
          toast.success('Post created successfully!');
        }
        router.push('/admin/posts');
        router.refresh();
      } catch (error: any) {
        toast.error(error.message || 'Something went wrong');
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/posts"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
        >
          <FaArrowLeft /> Back to Posts
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {isEdit ? 'Edit Post' : 'Create New Post'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm">
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-blue-500 transition-all font-semibold"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-2">
              Excerpt (Brief description)
            </label>
            <textarea
              rows={2}
              id="excerpt"
              name="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Summarize your post..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-blue-500 transition-all text-sm"
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-2">
              Content (Markdown ready)
            </label>
            <textarea
              required
              rows={12}
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your story here..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-blue-500 transition-all font-mono text-sm leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* Cover Image */}
            <div className="md:col-span-1">
              <label className="flex items-center gap-2 text-sm font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-2">
                <FaImage className="text-blue-500" /> Cover Image
              </label>
              <div className="space-y-4">
                <label htmlFor="cover_image" className="hover:border-indigo-500 transition-colors cursor-pointer group flex flex-col items-center justify-center border-2 border-dashed border-gray-100 dark:border-zinc-800 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 p-8 h-48 relative overflow-hidden">
                  {previewImage ? (
                    <>
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault(); // Prevent form submission
                          e.stopPropagation(); // Prevent label click from re-opening file dialog
                          setPreviewImage(null);
                          // If it was an existing image, we might need a way to signal its removal to the server
                          // For now, setting to null means no image will be sent if a new one isn't selected.
                        }}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-20"
                      >
                        Remove
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center text-center">
                      <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-2 group-hover:scale-110 transition-transform">
                        <FaImage />
                      </div>
                      <span className="text-xs font-bold text-gray-500 dark:text-gray-400">Pilih berkas sampul</span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">PNG, JPG up to 5MB</span>
                    </div>
                  )}
                  <input
                    type="file"
                    id="cover_image"
                    name="cover_image_file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    {...(!isEdit ? { required: true } : {})}
                  />
                </label>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="flex items-center gap-2 text-sm font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-2">
                <FaTags className="text-indigo-500" /> Tags (comma separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="tech, webdev, personal"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-blue-500 transition-all text-sm"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 dark:border-zinc-800 flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </span>
            ) : (
              <>
                <FaSave /> {isEdit ? 'Update Post' : 'Create Post'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
