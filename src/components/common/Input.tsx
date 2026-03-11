import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

/**
 * Reusable Input component with label and error message support.
 *
 * Uses `forwardRef` so React Hook Form can register it directly:
 *   <Input {...register('email')} error={errors.email?.message} />
 *
 * Why forwardRef?
 * React Hook Form needs a ref to the actual <input> DOM element
 * to manage focus, validation, etc. Without forwardRef, the ref
 * would get lost inside our component wrapper.
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-lg border text-sm
            focus:outline-none focus:ring-1 transition-colors duration-150
            ${error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-primary focus:ring-primary'
            }
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-500">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
