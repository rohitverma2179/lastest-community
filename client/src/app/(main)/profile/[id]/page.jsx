import OtherProfilePage from '@/pages/OtherProfilePage';

export function generateStaticParams() {
  return [{ id: 'me' }];
}

export default function Page() {
  return <OtherProfilePage />;
}
