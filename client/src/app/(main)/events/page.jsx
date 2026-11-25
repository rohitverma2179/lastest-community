'use client';

import { Providers } from '@/app/providers';
import EventsPage from '@/pages/EventsPage';

export default function Page() {
  return (
    <Providers>
      <EventsPage />
    </Providers>
  );
}
