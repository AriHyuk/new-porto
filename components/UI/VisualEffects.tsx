'use client';

import dynamic from 'next/dynamic';

const MeshBackground = dynamic(() => import('./MeshBackground'), {
  ssr: false,
});

const ScrollProgress = dynamic(() => import('./ScrollProgress'), {
  ssr: false,
});

const CustomCursor = dynamic(() => import('./CustomCursor'), {
  ssr: false,
});

export default function VisualEffects() {
  return (
    <>
      <CustomCursor />
      <MeshBackground />
      <ScrollProgress />
    </>
  );
}
