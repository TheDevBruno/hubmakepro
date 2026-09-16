import React, { forwardRef } from 'react'
import { Loader2, Check } from 'lucide-react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  isSuccess?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const variantStyles: Record<string, string> = {
  primary: 'bg-pink-600 hover:bg-pink-500 text-white shadow-md shadow-pink-600/20 border-transparent',
  secondary: 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/20 border-transparent',
  accent: 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 border-transparent',
  outline: 'bg-transparent border border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600',
  ghost: 'bg-transparent text-slate-300 hover:bg-slate-800/60 hover:text-white border-transparent',
  danger: 'bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/20 border-transparent',
  success: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 border-transparent',
}

const sizeStyles: Record<string, string> = {
  sm: 'px-2.5 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-4 py-2 text-xs font-semibold rounded-xl gap-2',
  lg: 'px-5 py-2.5 text-sm font-bold rounded-xl gap-2.5',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      isSuccess = false,
      leftIcon,
      rightIcon,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    const isInteractivityDisabled = disabled || isLoading

    return (
      <button
        ref={ref}
        disabled={isInteractivityDisabled}
        aria-busy={isLoading}
        className={`inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:ring-offset-2 focus:ring-offset-[#090d16] disabled:opacity-50 disabled:cursor-not-allowed select-none border ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size] || sizeStyles.md} ${className}`}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden="true" />
            <span>Carregando...</span>
          </>
        ) : isSuccess ? (
          <>
            <Check className="h-4 w-4 text-emerald-300 shrink-0" aria-hidden="true" />
            <span>{children}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0" aria-hidden="true">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="shrink-0" aria-hidden="true">{rightIcon}</span>}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
