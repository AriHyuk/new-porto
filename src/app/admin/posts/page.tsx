import { getAllPostsAdmin } from '@/actions/get-posts';
import PostsListClient from '@/components/Admin/Posts/PostsList';

export const dynamic = 'force-dynamic';

export default async function AdminPostsPage() {
  const posts = await getAllPostsAdmin();
  return <PostsListClient initialPosts={posts} />;
}
