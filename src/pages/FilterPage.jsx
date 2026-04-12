import { useState } from 'react'
import StatusBar from '../components/StatusBar'

// ─── Assets ────────────────────────────────────────────────────────
const ASSETS = {
  arrowBack: '/image/filterpage_arrowback.png',
}

// ─── Constants ─────────────────────────────────────────────────────
const PRODUCT_TYPES = ['All', 'Prompt', 'Agents', 'Tools']
const CATEGORIES = [
  ['All'],
  ['Non x402', 'x402', 'Finance'],
  ['Healthcare', 'Education', 'Sales'],
  ['Research', 'Public Safety'],
  ['Marketing', 'Customer Support'],
  ['Other'],
]

// ─── Sub-components ────────────────────────────────────────────────
function FilterChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 cursor-pointer"
      style={{
        display: 'flex',
        height: '44px',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '14px 20px',
        borderRadius: '16px',
        border: 'none',
        outline: 'none',
        background: active ? '#1f1f1f' : '#111',
        color: active ? '#fff' : '#999',
        fontSize: active ? '12px' : '14px',
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 400,
        lineHeight: '21px',
      }}
    >
      {label}
    </button>
  )
}

// ─── Page ──────────────────────────────────────────────────────────
export default function FilterPage({ onBack }) {
  const [selectedType, setSelectedType] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')

  return (
    <div className="flex flex-col h-full bg-black" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <StatusBar />

      {/* Back button */}
      <div className="shrink-0 px-6 py-3">
        <button onClick={onBack} className="bg-transparent border-0 cursor-pointer p-0">
          <img src={ASSETS.arrowBack} alt="Back" className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scroll-hide px-6 flex flex-col gap-5">
        {/* Product Type */}
        <div className="flex flex-col gap-5">
          <h2 className="text-white text-[18px] font-bold leading-[26px] m-0">Product Type</h2>

          {/* All chip (row 1) */}
          <div className="flex items-center">
            <FilterChip
              label="All"
              active={selectedType === 'All'}
              onClick={() => setSelectedType('All')}
            />
          </div>

          {/* Prompt / Agents / Tools (row 2) */}
          <div className="flex items-center gap-5">
            {PRODUCT_TYPES.filter(t => t !== 'All').map(type => (
              <FilterChip
                key={type}
                label={type}
                active={selectedType === type}
                onClick={() => setSelectedType(type)}
              />
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-5">
          <h2 className="text-white text-[18px] font-bold leading-[26px] m-0">Categories</h2>

          {CATEGORIES.map((row, i) => (
            <div key={i} className="flex items-center gap-5 flex-wrap">
              {row.map(cat => (
                <FilterChip
                  key={cat}
                  label={cat}
                  active={selectedCategory === cat}
                  onClick={() => setSelectedCategory(cat)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
