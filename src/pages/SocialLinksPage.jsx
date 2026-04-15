import { useState } from 'react'
import StatusBar from '../components/StatusBar'

// ─── Figma remote assets ────────────────────────────────────────────
const ICON_X        = 'https://www.figma.com/api/mcp/asset/bfdcb1de-3ee0-4eb3-b91e-c4d11dc1db5e'
const ICON_DISCORD  = 'https://www.figma.com/api/mcp/asset/ebfcf126-37b2-442e-9e1d-9294e0052cf1'
const ICON_TELEGRAM = 'https://www.figma.com/api/mcp/asset/35bff84a-e709-4eda-9941-25c421b3ee37'
const ICON_GITHUB   = 'https://www.figma.com/api/mcp/asset/f675576d-968c-4e5f-a13d-1aa451bf03a0'
const ICON_YOUTUBE  = 'https://www.figma.com/api/mcp/asset/596bda9f-3b6a-4e7e-99e0-214d60e084a2'

function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
    </svg>
  )
}

// ─── Initial values ─────────────────────────────────────────────────
const INITIAL = {
  linkedin: 'https://www.linkedin/kevin/?hl=en',
  reddit:   'https://www.reddit.com/l',
}

export default function SocialLinksPage({ onBack }) {
  const [form, setForm]       = useState(INITIAL)
  const [focused, setFocused] = useState(null)

  const isDirty = Object.keys(INITIAL).some(k => form[k] !== INITIAL[k])

  function set(key) {
    return e => setForm(prev => ({ ...prev, [key]: e.target.value }))
  }

  function inputStyle(key) {
    return {
      width: '100%',
      height: '48px',
      background: '#111',
      border: focused === key ? '1px solid #fff' : '1px solid transparent',
      borderRadius: '8px',
      padding: '0 10px',
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 500,
      fontSize: '14px',
      color: '#fff',
      outline: 'none',
      boxSizing: 'border-box',
      lineHeight: '21px',
    }
  }

  // ─── Shared label style ─────────────────────────────────────────
  const labelStyle = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 500,
    fontSize: '14px',
    color: '#fff',
    marginBottom: '8px',
  }

  return (
    <div
      style={{
        width: '375px',
        height: '812px',
        background: '#000',
        margin: '0 auto',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <StatusBar />

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 24px',
        flexShrink: 0,
      }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
        >
          <BackIcon />
        </button>

        <span style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: '18px',
          color: '#fff',
          lineHeight: '27px',
        }}>
          Social Links
        </span>

        <button
          style={{
            background: 'none',
            border: 'none',
            cursor: isDirty ? 'pointer' : 'default',
            padding: 0,
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            fontSize: '16px',
            color: isDirty ? '#fff' : '#999',
            transition: 'color 0.2s',
          }}
        >
          Save
        </button>
      </div>

      {/* Fields */}
      <div style={{ padding: '16px 24px 0', display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* Linkedin */}
        <div>
          <p style={labelStyle}>Linkedin</p>
          <input
            type="text"
            value={form.linkedin}
            onChange={set('linkedin')}
            onFocus={() => setFocused('linkedin')}
            onBlur={() => setFocused(null)}
            style={inputStyle('linkedin')}
          />
        </div>

        {/* Reddit */}
        <div>
          <p style={labelStyle}>Reddit</p>
          <input
            type="text"
            value={form.reddit}
            onChange={set('reddit')}
            onFocus={() => setFocused('reddit')}
            onBlur={() => setFocused(null)}
            style={inputStyle('reddit')}
          />
        </div>

        {/* Follow Swarms */}
        <div>
          <p style={labelStyle}>Follow Swarms</p>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {[
              { icon: ICON_X,        alt: 'X'        },
              { icon: ICON_DISCORD,  alt: 'Discord'  },
              { icon: ICON_TELEGRAM, alt: 'Telegram' },
              { icon: ICON_GITHUB,   alt: 'GitHub'   },
              { icon: ICON_YOUTUBE,  alt: 'YouTube'  },
            ].map(({ icon, alt }) => (
              <button
                key={alt}
                style={{
                  width: '49px',
                  height: '49px',
                  background: '#111',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <img src={icon} alt={alt} style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
