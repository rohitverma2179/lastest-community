'use client';

import { useEffect, useState } from 'react';

export default function RouteToaster() {
  const [ToasterComp, setToasterComp] = useState(null);

  useEffect(() => {
    let active = true;
    import('react-hot-toast').then((mod) => {
      if (active) setToasterComp(() => mod.Toaster);
    });
    return () => { active = false; };
  }, []);

  return ToasterComp ? <ToasterComp position="top-right" /> : null;
}
