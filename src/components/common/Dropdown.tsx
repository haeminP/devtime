import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface DropdownOption {
  value: string
  label: string
}

interface DropdownProps {
  label: string
  options: DropdownOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  error?: string
  disabled?: boolean
}

/**
 * Dropdown — custom select component matching Figma design.
 *
 * Why not native <select>?
 * Native selects can't be fully styled across browsers.
 * We need pixel-perfect control over the trigger, list, and states.
 *
 * Designed to work with react-hook-form via Controller:
 *   <Controller render={({ field }) => <Dropdown {...field} ... />} />
 */
function Dropdown({
  label,
  options,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedLabel = options.find((opt) => opt.value === value)?.label

  // Close dropdown when user clicks outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSelect(optionValue: string) {
    onChange?.(optionValue)
    setIsOpen(false)
  }

  return (
    <div className="flex flex-col gap-2" ref={containerRef}>
      <label className="text-sm font-medium text-gray-600">{label}</label>

      {/* Trigger */}
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen((prev) => !prev)}
          className={[
            'w-full h-11 flex items-center justify-between gap-2 px-4 rounded-[5px]',
            'bg-gray-50 text-sm transition-colors',
            isOpen ? 'ring-1 ring-primary' : 'ring-1 ring-transparent',
            error ? 'ring-1 ring-red-400' : '',
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:ring-1 hover:ring-gray-300',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <span className={selectedLabel ? 'text-gray-800' : 'text-[#CCD0D6]'}>
            {selectedLabel ?? placeholder}
          </span>
          {isOpen ? (
            <ChevronUp size={20} className="text-gray-500 shrink-0" />
          ) : (
            <ChevronDown size={20} className="text-gray-500 shrink-0" />
          )}
        </button>

        {/* Options list */}
        {isOpen && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-[5px] shadow-md overflow-hidden">
            {options.map((opt) => (
              <li
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={[
                  'px-4 py-3 text-sm cursor-pointer transition-colors',
                  opt.value === value
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-gray-800 hover:bg-gray-50',
                ].join(' ')}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

export default Dropdown
