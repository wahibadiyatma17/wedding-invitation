'use client';

import dynamic from 'next/dynamic';

// Dynamically import with SSR disabled to avoid window issues
const InvitationPageContent = dynamic(
  () => import('@/components/pages/InvitationPageContent').then(mod => mod.InvitationPageContent),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center" style={{background: '#FDF1E9'}}>
        <div className="text-wedding-dark">Loading...</div>
      </div>
    )
  }
);

export default function NgunduhMantuPage() {
  return <InvitationPageContent eventFilter="resepsi" />;
}
