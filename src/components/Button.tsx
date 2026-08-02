import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LoaderCircle, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  loadingText?: string;
  successText?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      children,
      onClick,
      loadingText = 'Loading...',
      successText = 'Inafungua...',
      ...props
    },
    ref
  ) => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (status === 'idle' && onClick) {
        try {
          const result = onClick(e);
          if (result instanceof Promise) {
            setStatus('loading');
            await result;
            setStatus('success');
            setTimeout(() => {
              setStatus('idle');
            }, 2000);
          }
        } catch (error) {
          setStatus('idle');
          console.error('Action failed:', error);
        }
      }
    };

    const variantStyles = {
      default: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
      outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
    };

    const sizeStyles = {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 rounded-lg px-3 text-xs',
      lg: 'h-10 rounded-lg px-8',
      icon: 'h-9 w-9',
    };

    return (
      <button
        ref={ref}
        onClick={handleClick}
        disabled={status === 'loading' || props.disabled}
        className={cn(
          'relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 overflow-hidden cursor-pointer active:scale-95 select-none',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex items-center justify-center gap-2"
            >
              {children}
            </motion.span>
          )}

          {status === 'loading' && (
            <motion.span
              key="loading"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex items-center justify-center gap-2 text-teal"
            >
              <LoaderCircle className="h-4 w-4 animate-spin text-teal" />
              <span>{loadingText}</span>
            </motion.span>
          )}

          {status === 'success' && (
            <motion.span
              key="success"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex items-center justify-center gap-2 text-[#10b981]"
            >
              <Check className="h-4 w-4 text-[#10b981]" />
              <span>{successText}</span>
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    );
  }
);

Button.displayName = 'Button';
