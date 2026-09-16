import React, { forwardRef, useId } from 'react'
import { AlertCircle, ChevronDown } from 'lucide-react'

export interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  helperText?: string
  errorMessage?: string
  options?: SelectOption[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      options = [],
      placeholder,
      children,
      disabled,
      required,
      id,
      className = '',
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const selectId = id || generatedId
    const helperId = `${selectId}-helper`
    const errorId = `${selectId}-error`

    const hasError = Boolean(errorMessage)

    return (
      <div className="w-full space-y-1 text-left">
        {label && (
          <label htmlFor={selectId} className="block text-xs font-semibold text-slate-300">
            {label} {required && <span className="text-pink-400" aria-hidden="true">*</span>}
          </label>
        )}

        <div className="relative rounded-xl bg-slate-900 border transition-all duration-200 focus-within:ring-2 focus-within:ring-pink-500/30 overflow-hidden border-slate-700 focus-within:border-pink-500">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            required={required}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : helperText ? helperId : undefined}
            className={`w-full bg-transparent pl-3 pr-8 py-2 text-xs text-white focus:outline-none appearance-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${className}`}
            {...props}
          >
            {placeholder && (
              <option value="" className="bg-slate-900 text-slate-500">
                {placeholder}
              </option>
            )}
            {options.length > 0
              ? options.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                    className="bg-slate-900 text-white"
                  >
                    {opt.label}
                  </option>
                ))
              : children}
          </select>

          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </div>
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

Select.displayName = 'Select'
