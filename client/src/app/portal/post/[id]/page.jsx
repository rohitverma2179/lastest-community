import PostDetailPage from '@/pages/PostDetailPage';
import { FEED_POSTS } from '@/data/posts';

export function generateStaticParams() {
  return FEED_POSTS.map((p) => ({ id: p.id }));
}

export default function Page() {
  return <PostDetailPage />;
}
