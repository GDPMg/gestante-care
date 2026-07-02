import type { InputHTMLAttributes } from 'react'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  helperText?: string
}

export default function TextField({ label, helperText, id, className = '', ...props }: TextFieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={fieldId} className="text-sm font-medium text-brand-ink">
        {label}
      </label>
      <input
        id={fieldId}
        className={`w-full rounded-2xl border border-brand-border bg-white px-4 py-3.5 text-brand-ink placeholder:text-brand-muted focus:border-brand-green focus:outline-none ${className}`}
        {...props}
      />
      {helperText && <p className="text-xs text-brand-muted">{helperText}</p>}
    </div>
  )
}
