'use client';

import toast from 'react-hot-toast';

export function useShare() {

  const getShareData = () => ({
    title: 'Undangan Pernikahan Aji & Ery',
    text: 'Anda diundang ke pernikahan kami! 💒',
    url: typeof window !== 'undefined' ? window.location.href : ''
  });

  const shareToWhatsApp = () => {
    const shareData = getShareData();
    const text = encodeURIComponent(`${shareData.text}\n\n${shareData.url}`);
    const whatsappUrl = `https://wa.me/?text=${text}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const shareToFacebook = () => {
    const shareData = getShareData();
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`;
    window.open(facebookUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  const shareToTwitter = () => {
    const shareData = getShareData();
    const text = encodeURIComponent(shareData.text);
    const url = encodeURIComponent(shareData.url);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  const copyLink = async () => {
    const shareData = getShareData();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareData.url);
        toast.success('Link berhasil disalin!');
      } else {
        // Fallback for non-secure contexts or older browsers
        const textArea = document.createElement('textarea');
        textArea.value = shareData.url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          document.execCommand('copy');
          toast.success('Link berhasil disalin!');
        } catch {
          toast.error('Gagal menyalin link');
        }

        textArea.remove();
      }
    } catch {
      toast.error('Gagal menyalin link');
    }
  };

  const nativeShare = async () => {
    const shareData = getShareData();
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback to copy link if native share not supported
        await copyLink();
      }
    } catch {
      // User cancelled share or error occurred
      // Don't show error toast as user might have just cancelled
    }
  };

  return {
    shareToWhatsApp,
    shareToFacebook,
    shareToTwitter,
    copyLink,
    nativeShare,
    get isNativeShareSupported() {
      return typeof navigator !== 'undefined' && !!navigator.share;
    }
  };
}
