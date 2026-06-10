'use client';

import { Toaster } from 'react-hot-toast';

export default function Providers() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: 'var(--color-gradient-warm-mid)',
          color: 'var(--color-white)',
        },
      }}
    />
  );
}
