import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

export default function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const base = 'w-full rounded-full px-6 py-4 text-base font-semibold transition disabled:cursor-not-allowed disabled:opacity-50'
  const variants = {
    primary: 'bg-brand-green text-white hover:bg-brand-green-dark',
    secondary: 'border border-brand-border bg-white text-brand-ink hover:bg-brand-cream',
  }

  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />
}
