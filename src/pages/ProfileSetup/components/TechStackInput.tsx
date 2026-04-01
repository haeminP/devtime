import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { X, Plus } from 'lucide-react'
import { profileApi } from '@/api/profile'

interface TechStackInputProps {
  value: string[]
  onChange: (stacks: string[]) => void
}

/**
 * TechStackInput — autocomplete search + chip display for tech stacks.
 *
 * How it works:
 * 1. User types in the input → debounced API search (300ms delay)
 * 2. Results appear in a dropdown list
 * 3. Clicking a result adds it as a chip + clears the input
 * 4. If no results, user can create a new tech stack via "+ Add New Item"
 * 5. Chips can be removed with the X button
 *
 * The debounce timer is stored in useRef — it needs to persist across
 * re-renders (so we can cancel the previous timer), but changing it
 * shouldn't trigger a re-render (the user never sees a timer ID).
 */
function TechStackInput({ value, onChange }: TechStackInputProps) {
  const { t } = useTranslation()

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // useRef for debounce: persists across renders, no re-render on change
  const debounceRef = useRef<ReturnType<typeof setTimeout>>()
  // useRef for click-outside: same pattern as Dropdown
  const containerRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSearch(input: string) {
    setQuery(input)

    // Clear previous timer — this is the "cancel" part of debouncing
    clearTimeout(debounceRef.current)

    if (!input.trim()) {
      setResults([])
      setIsOpen(false)
      return
    }

    // Start new timer — API call fires only after 300ms of no typing
    debounceRef.current = setTimeout(async () => {
      setIsLoading(true)
      try {
        const data = await profileApi.getTechStacks(input.trim())
        // Filter out already-selected stacks from results
        const filtered = (data as string[]).filter(
          (stack) => !value.includes(stack)
        )
        setResults(filtered)
        setIsOpen(true)
      } catch {
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 300)
  }

  function handleSelect(stack: string) {
    if (!value.includes(stack)) {
      onChange([...value, stack])
    }
    setQuery('')
    setResults([])
    setIsOpen(false)
  }

  async function handleCreateNew() {
    if (!query.trim()) return
    try {
      await profileApi.createTechStack(query.trim())
      handleSelect(query.trim())
    } catch {
      // If creation fails (e.g. already exists), still try to add it
      handleSelect(query.trim())
    }
  }

  function handleRemove(stack: string) {
    onChange(value.filter((s) => s !== stack))
  }

  return (
    <div className="flex flex-col gap-2" ref={containerRef}>
      <label className="text-sm font-medium text-gray-600">
        {t('profile.techStacks')}
      </label>

      {/* Search input */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.trim() && results.length > 0 && setIsOpen(true)}
          placeholder={t('profile.techStackPlaceholder')}
          className="w-full h-11 px-4 rounded-[5px] bg-gray-50 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        />

        {/* Results dropdown */}
        {isOpen && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-[5px] shadow-md overflow-hidden max-h-48 overflow-y-auto">
            {isLoading ? (
              <li className="px-4 py-3 text-sm text-gray-400">Searching...</li>
            ) : results.length > 0 ? (
              results.map((stack) => (
                <li
                  key={stack}
                  onClick={() => handleSelect(stack)}
                  className="px-4 py-3 text-sm text-gray-800 cursor-pointer hover:bg-gray-50"
                >
                  {stack}
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-400 px-4 py-3">
                No results found.
              </li>
            )}

            {/* "+ Add New Item" — always visible when there's a query */}
            {query.trim() && !value.includes(query.trim()) && (
              <li
                onClick={handleCreateNew}
                className="flex items-center gap-2 px-4 py-3 text-sm text-primary cursor-pointer hover:bg-primary/5 border-t border-gray-100"
              >
                <Plus size={16} />
                <span>Add "{query.trim()}"</span>
              </li>
            )}
          </ul>
        )}
      </div>

      {/* Selected chips */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((stack) => (
            <span
              key={stack}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-[5px] border border-primary"
            >
              {stack}
              <button
                type="button"
                onClick={() => handleRemove(stack)}
                className="text-primary hover:text-primary-700 cursor-pointer"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default TechStackInput
