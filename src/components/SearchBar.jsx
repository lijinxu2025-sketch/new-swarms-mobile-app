import { useState, useRef, useEffect } from 'react'

// ─── Assets ────────────────────────────────────────────────────────
const ICON_SEARCH_DEFAULT = '/image/searchbar_icon_search_default.svg'
const ICON_SEARCH_ACTIVE  = '/image/searchbar_icon_search_active.svg'
const ICON_CLEAR          = '/image/searchbar_icon_clear.svg'
const ICON_FILTER         = '/image/searchbar_icon_filter.svg'

/**
 * SearchBar component
 * - onTap: if provided, the whole bar acts as a clickable button (used on HomePage to navigate to SearchPage)
 * - onFilter: shows filter button when provided
 * - onSearch: called on form submit
 * - autoFocus: auto-focus the input
 * - showFilter: whether to show the filter button (default true)
 */
export default function SearchBar({ onFilter, onSearch, onTap, autoFocus = false, showFilter = true }) {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(autoFocus)
  const inputRef = useRef(null)

  const state = value.length > 0 ? 'filled' : focused ? 'active' : 'default'

  useEffect(() => {
    if (autoFocus && inputRef.current) inputRef.current.focus()
  }, [autoFocus])

  const handleClear = () => {
    setValue('')
    inputRef.current?.focus()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim() && onSearch) onSearch(value.trim())
  }

  // Tap mode: whole bar is a button that navigates
  if (onTap) {
    return (
      <div className="flex items-center gap-1 px-4 sm:px-6">
        <div
          onClick={onTap}
          className="flex items-center gap-3 flex-1 h-[56px] rounded-[10px] min-w-0 cursor-pointer"
          style={{ background: '#111', padding: '16px 12px 16px 20px' }}
        >
          <img src={ICON_SEARCH_DEFAULT} alt="" className="w-6 h-6 shrink-0" />
          <span
            className="text-[16px] font-medium"
            style={{ fontFamily: "'Montserrat', sans-serif", color: '#777' }}
          >
            Search your agent...
          </span>
        </div>
        {showFilter && onFilter && (
          <button
            type="button"
            onClick={onFilter}
            className="w-[56px] h-[56px] rounded-[12px] flex items-center justify-center shrink-0 border-0 cursor-pointer"
            style={{ background: '#111' }}
          >
            <img src={ICON_FILTER} alt="Filter" className="w-6 h-6" />
          </button>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-1 px-4 sm:px-6">
      {/* Input Field */}
      <div
        className="flex items-center gap-3 flex-1 h-[56px] rounded-[10px] min-w-0"
        style={{
          background: '#111',
          padding: '16px 12px 16px 20px',
          border: state === 'active' ? '1.5px solid #fff' : '1.5px solid transparent',
        }}
      >
        <img
          src={state === 'default' ? ICON_SEARCH_DEFAULT : ICON_SEARCH_ACTIVE}
          alt=""
          className="w-6 h-6 shrink-0"
        />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search your agent..."
          className="flex-1 min-w-0 bg-transparent border-0 outline-none text-[16px] font-medium p-0 m-0"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            color: state === 'filled' ? '#fff' : '#777',
            caretColor: '#fff',
          }}
        />
        {state === 'filled' && (
          <button
            type="button"
            onClick={handleClear}
            className="shrink-0 bg-transparent border-0 cursor-pointer p-0 flex items-center justify-center"
          >
            <img src={ICON_CLEAR} alt="Clear" className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Filter Button */}
      {showFilter && onFilter && (
        <button
          type="button"
          onClick={onFilter}
          className="w-[56px] h-[56px] rounded-[12px] flex items-center justify-center shrink-0 border-0 cursor-pointer"
          style={{ background: '#111' }}
        >
          <img src={ICON_FILTER} alt="Filter" className="w-6 h-6" />
        </button>
      )}
    </form>
  )
}
