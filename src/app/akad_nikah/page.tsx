'use client';

import { Suspense } from 'react';
import { InvitationPageContent } from '@/components/pages/InvitationPageContent';

function AkadNikahContent() {
  return <InvitationPageContent eventFilter="akad" />;
}

export default function AkadNikahPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{background: '#FDF1E9'}}>
        <div className="text-wedding-dark">Loading...</div>
      </div>
    }>
      <AkadNikahContent />
    </Suspense>
  );
}
