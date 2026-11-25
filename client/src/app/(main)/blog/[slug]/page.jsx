import BlogDetailPage from '@/pages/BlogDetailPage';
import RouteToaster from '@/components/layout/RouteToaster';
import { BLOGS } from '@/data/blog';

export function generateStaticParams() {
  return BLOGS.map((b) => ({ slug: b.slug }));
}

export default function Page() {
  return (
    <>
      <RouteToaster />
      <BlogDetailPage />
    </>
  );
}
