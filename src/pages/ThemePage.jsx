import { useState } from 'react'
import StatusBar from '../components/StatusBar'

// ─── Figma asset ────────────────────────────────────────────────────
const ICON_CHECK = 'https://www.figma.com/api/mcp/asset/e178d81a-a091-42ee-acae-10b197d78e36'

function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
    </svg>
  )
}

const OPTIONS = [
  { id: 'system', label: 'Follow System' },
  { id: 'light',  label: 'Light Mode'    },
  { id: 'dark',   label: 'Dark Mode'     },
]

export default function ThemePage({ onBack }) {
  const [selected, setSelected] = useState('dark')

  return (
    <div style={{
      width: '375px', height: '812px', background: '#000',
      margin: '0 auto', position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      <StatusBar />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '14px 24px', flexShrink: 0 }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
        >
          <BackIcon />
        </button>
        <span style={{
          fontFamily: 'Montserrat, sans-serif', fontWeight: 600,
          fontSize: '16px', color: '#fff', flex: 1, textAlign: 'center', marginRight: '24px',
        }}>
          Theme
        </span>
      </div>

      {/* Options */}
      <div style={{ padding: '16px 24px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {OPTIONS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setSelected(id)}
            style={{
              width: '100%', height: '48px',
              background: '#111', border: 'none', borderRadius: '8px',
              padding: '8px 16px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              boxSizing: 'border-box',
            }}
          >
            <span style={{
              fontFamily: 'Montserrat, sans-serif', fontWeight: 500,
              fontSize: '14px', color: '#fff', whiteSpace: 'nowrap',
            }}>
              {label}
            </span>
            {selected === id && (
              <img src={ICON_CHECK} alt="selected" style={{ width: '24px', height: '24px' }} />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
