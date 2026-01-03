import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  'relative rounded-2xl backdrop-blur-sm transition-all duration-300 overflow-hidden',
  {
    variants: {
      variant: {
        elegant: 'bg-gradient-to-br from-white/95 via-white/90 to-stone-50/90 border border-stone-200/50 shadow-lg hover:shadow-xl',
        wedding: 'bg-gradient-to-br from-amber-50/95 via-white/90 to-rose-50/90 border-2 border-amber-200/30 shadow-lg hover:shadow-xl',
        transparent: 'bg-transparent border-none shadow-none',
        romantic: 'bg-gradient-to-br from-rose-50/95 via-pink-50/90 to-white/90 border border-rose-200/40 shadow-lg hover:shadow-xl'
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10'
      }
    },
    defaultVariants: {
      variant: 'elegant',
      size: 'md'
    }
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  children: React.ReactNode;
  decorative?: boolean;
  hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, children, decorative = false, hover = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant, size }),
          {
            'hover-lift': hover,
            'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-skew-x-12 before:-translate-x-full hover:before:animate-shimmer': 
              variant !== 'transparent'
          },
          className
        )}
        {...props}
      >
        {decorative && (
          <>
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-amber-300/40 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-amber-300/40 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-amber-300/40 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-amber-300/40 rounded-br-lg" />
          </>
        )}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card, cardVariants };