import { useEffect, useRef, useState } from 'react'

type Option = { value: string; label: string }

type SelectFieldProps = {
  label: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  options: Option[]
  id?: string
}

export default function SelectField({ label, placeholder = 'Selecione', value, onChange, options, id }: SelectFieldProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, '-')
  const selected = options.find((option) => option.value === value)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="flex flex-col gap-2" ref={containerRef}>
      <label htmlFor={fieldId} className="text-sm font-medium text-brand-ink">
        {label}
      </label>

      <div className="relative">
        <button
          type="button"
          id={fieldId}
          onClick={() => setOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={`flex w-full items-center justify-between rounded-2xl border bg-white px-4 py-3.5 text-left transition focus:outline-none ${
            open ? 'border-brand-green' : 'border-brand-border'
          } ${selected ? 'text-brand-ink' : 'text-brand-muted'}`}
        >
          <span>{selected ? selected.label : placeholder}</span>
          <svg
            className={`h-4 w-4 shrink-0 text-brand-muted transition-transform ${open ? 'rotate-180' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {open && (
          <ul
            role="listbox"
            className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-2xl border border-brand-border bg-white p-1.5 shadow-lg"
          >
            {options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={option.value === value}
                  onClick={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}
                  className={`w-full rounded-xl px-3 py-2.5 text-left text-sm transition ${
                    option.value === value
                      ? 'bg-brand-green-tint font-semibold text-brand-green-dark'
                      : 'text-brand-ink hover:bg-brand-cream'
                  }`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
