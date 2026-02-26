import { getPostById } from '@/actions/get-posts';
import PostForm from '@/components/Admin/Posts/PostForm';
import { notFound } from 'next/navigation';

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  return <PostForm post={post as any} />;
}
