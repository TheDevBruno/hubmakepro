import React, { forwardRef, useId } from 'react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helperText?: string
  errorMessage?: string
  isSuccess?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      isSuccess = false,
      disabled,
      required,
      id,
      rows = 3,
      className = '',
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const textareaId = id || generatedId
    const helperId = `${textareaId}-helper`
    const errorId = `${textareaId}-error`

    const hasError = Boolean(errorMessage)

    return (
      <div className="w-full space-y-1 text-left">
        {label && (
          <label htmlFor={textareaId} className="block text-xs font-semibold text-slate-300">
            {label} {required && <span className="text-pink-400" aria-hidden="true">*</span>}
          </label>
        )}

        <div
          className={`relative rounded-xl bg-slate-900 border transition-all duration-200 focus-within:ring-2 focus-within:ring-pink-500/30 overflow-hidden ${
            hasError
              ? 'border-red-500/80 focus-within:border-red-500'
              : 'border-slate-700 focus-within:border-pink-500'
          }`}
        >
          <textarea
            ref={ref}
            id={textareaId}
            rows={rows}
            disabled={disabled}
            required={required}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : helperText ? helperId : undefined}
            className={`w-full bg-transparent px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed resize-y ${className}`}
            {...props}
          />
        </div>

        {hasError && (
          <p id={errorId} className="text-[11px] text-red-400 flex items-center gap-1 font-medium mt-0.5" role="alert">
            <AlertCircle className="h-3 w-3 shrink-0" />
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

Textarea.displayName = 'Textarea'
