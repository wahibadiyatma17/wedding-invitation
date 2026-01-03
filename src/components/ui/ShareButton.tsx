'use client';

import { MessageCircle, Facebook, Twitter, Link as LinkIcon, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ShareButtonProps {
  platform: 'whatsapp' | 'facebook' | 'twitter' | 'copy' | 'native';
  onClick: () => void;
  variant?: 'floating' | 'inline';
  className?: string;
}

export function ShareButton({ platform, onClick, variant = 'inline', className }: ShareButtonProps) {
  const config = {
    whatsapp: {
      icon: MessageCircle,
      label: 'WhatsApp',
      color: 'hover:bg-green-500 hover:text-white',
      bgColor: 'bg-green-500'
    },
    facebook: {
      icon: Facebook,
      label: 'Facebook',
      color: 'hover:bg-blue-600 hover:text-white',
      bgColor: 'bg-blue-600'
    },
    twitter: {
      icon: Twitter,
      label: 'Twitter',
      color: 'hover:bg-sky-500 hover:text-white',
      bgColor: 'bg-sky-500'
    },
    copy: {
      icon: LinkIcon,
      label: 'Salin Link',
      color: 'hover:bg-wedding-accent hover:text-white',
      bgColor: 'bg-wedding-accent'
    },
    native: {
      icon: Share2,
      label: 'Bagikan',
      color: 'hover:bg-wedding-primary hover:text-white',
      bgColor: 'bg-wedding-primary'
    }
  };

  const { icon: Icon, label, color, bgColor } = config[platform];

  if (variant === 'floating') {
    return (
      <button
        onClick={onClick}
        className={cn(
          'flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all',
          'hover:scale-110 active:scale-95',
          bgColor,
          'text-white',
          className
        )}
        aria-label={label}
      >
        <Icon className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all',
        'border-wedding-secondary/30 bg-white text-wedding-dark',
        color,
        'hover:shadow-lg hover:border-transparent',
        'active:scale-95',
        'min-w-[100px] min-h-[100px]',
        className
      )}
      aria-label={label}
    >
      <Icon className="w-6 h-6" />
      <span className="font-wedding-body text-sm font-medium">{label}</span>
    </button>
  );
}
