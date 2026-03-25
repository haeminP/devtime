import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline'
  fullWidth?: boolean
}

/**
 * Reusable Button component.
 *
 * variant='primary' → solid blue (default)
 * variant='ghost'   → transparent with blue text
 * fullWidth         → stretches to fill container
 *
 * Inherits all native <button> props (onClick, disabled, type, etc.)
 */
function Button({
  variant = 'primary',
  fullWidth = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base = 'py-3 px-4 rounded-[5px] font-semibold text-sm transition-colors duration-150 cursor-pointer'

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-600 disabled:bg-[#969DA8] disabled:text-[#CCD0D6] disabled:cursor-not-allowed',
    ghost: 'bg-transparent text-primary hover:underline disabled:text-gray-400 disabled:cursor-not-allowed',
    outline: 'bg-primary/10 text-primary hover:bg-primary/20 disabled:bg-gray-200 disabled:text-[#969DA8] disabled:cursor-not-allowed',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
