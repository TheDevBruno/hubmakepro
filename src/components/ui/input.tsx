import React, { forwardRef, useId } from 'react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  errorMessage?: string
  isSuccess?: boolean
  prefixText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      isSuccess = false,
      prefixText,
      leftIcon,
      rightIcon,
      disabled,
      required,
      id,
      className = '',
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const inputId = id || generatedId
    const helperId = `${inputId}-helper`
    const errorId = `${inputId}-error`

    const hasError = Boolean(errorMessage)

    return (
      <div className="w-full space-y-1 text-left">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-slate-300">
            {label} {required && <span className="text-pink-400" aria-hidden="true">*</span>}
          </label>
        )}

        <div className="relative flex items-center rounded-xl bg-slate-900 border transition-all duration-200 focus-within:ring-2 focus-within:ring-pink-500/30 overflow-hidden border-slate-700 focus-within:border-pink-500 aria-invalid:border-red-500"
          aria-invalid={hasError}
        >
          {leftIcon && (
            <div className="pl-3 text-slate-400 flex items-center pointer-events-none" aria-hidden="true">
              {leftIcon}
            </div>
          )}

          {prefixText && (
            <span className="pl-3 text-xs font-semibold text-slate-400 select-none" aria-hidden="true">
              {prefixText}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : helperText ? helperId : undefined}
            className={`w-full bg-transparent px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            {...props}
          />

          {hasError && (
            <div className="pr-3 text-red-400 flex items-center pointer-events-none" aria-hidden="true">
              <AlertCircle className="h-4 w-4" />
            </div>
          )}

          {isSuccess && !hasError && (
            <div className="pr-3 text-emerald-400 flex items-center pointer-events-none" aria-hidden="true">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          )}

          {rightIcon && !hasError && !isSuccess && (
            <div className="pr-3 text-slate-400 flex items-center" aria-hidden="true">
              {rightIcon}
            </div>
          )}
        </div>

        {hasError && (
          <p id={errorId} className="text-[11px] text-red-400 flex items-center gap-1 font-medium mt-0.5" role="alert">
            {errorMessage}
          </p>
        )}

        {!hasError && helperText && (
          <p id={helperId} className="text-[11px] text-slate-400 mt-0.5">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
