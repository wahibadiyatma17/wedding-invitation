import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-wedding-body font-medium rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group',
  {
    variants: {
      variant: {
        elegant: [
          'bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-white shadow-lg',
          'hover:from-amber-600 hover:via-amber-700 hover:to-amber-800 hover:shadow-xl hover:scale-105',
          'focus-visible:ring-amber-400',
          'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
          'before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700'
        ],
        romantic: [
          'bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500 text-white shadow-lg',
          'hover:from-rose-300 hover:via-pink-300 hover:to-rose-400 hover:shadow-xl hover:scale-105',
          'focus-visible:ring-rose-400'
        ],
        outline: [
          'border-2 border-amber-600 text-amber-800 bg-transparent',
          'hover:bg-amber-600 hover:text-white hover:shadow-md hover:scale-105',
          'focus-visible:ring-amber-400'
        ],
        ghost: [
          'text-amber-800 bg-transparent',
          'hover:bg-amber-100 hover:text-amber-900',
          'focus-visible:ring-amber-400'
        ]
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
        xl: 'h-16 px-10 text-xl'
      }
    },
    defaultVariants: {
      variant: 'elegant',
      size: 'md'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };