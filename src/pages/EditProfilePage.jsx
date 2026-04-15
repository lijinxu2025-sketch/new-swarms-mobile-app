import { useState } from 'react'
import StatusBar from '../components/StatusBar'

// ─── Icons ──────────────────────────────────────────────────────────
function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
    </svg>
  )
}

function PencilIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white" opacity="0.8">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white" opacity="0.8">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
  )
}

// ─── Initial data ───────────────────────────────────────────────────
const INITIAL = {
  name:     'Carson li',
  birthday: '12/27/1995',
  email:    'Helloswarms@gamil.com',
  country:  'United States',
}

export default function EditProfilePage({ onBack }) {
  const [form, setForm]       = useState(INITIAL)
  const [focused, setFocused] = useState(null)

  const isDirty = Object.keys(INITIAL).some(k => form[k] !== INITIAL[k])

  function set(key) {
    return e => setForm(prev => ({ ...prev, [key]: e.target.value }))
  }

  // ─── Shared input style ────────────────────────────────────────────
  function inputStyle(key) {
    return {
      width: '100%',
      height: '48px',
      background: '#111',
      border: focused === key ? '1px solid #fff' : '1px solid transparent',
      borderRadius: '8px',
      padding: '0 10px',
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 400,
      fontSize: '14px',
      color: '#fff',
      outline: 'none',
      boxSizing: 'border-box',
      lineHeight: '21px',
    }
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
          Edit Profile
        </span>

        <button
          onClick={() => isDirty && setForm(form)}
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

      {/* Avatar */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px', marginBottom: '24px', position: 'relative' }}>
        <div style={{ position: 'relative', width: '84px', height: '84px' }}>
          <div style={{
            width: '84px',
            height: '84px',
            borderRadius: '42px',
            background: '#c1392b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '32px', color: '#fff' }}>
              CA
            </span>
          </div>
          {/* Edit overlay */}
          <button style={{
            position: 'absolute',
            bottom: '-4px',
            right: '-4px',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: '#1f1f1f',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}>
            <PencilIcon />
          </button>
        </div>
      </div>

      {/* Fields */}
      <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* Name */}
        <input
          type="text"
          value={form.name}
          onChange={set('name')}
          onFocus={() => setFocused('name')}
          onBlur={() => setFocused(null)}
          style={inputStyle('name')}
        />

        {/* Birthday */}
        <input
          type="text"
          value={form.birthday}
          onChange={set('birthday')}
          onFocus={() => setFocused('birthday')}
          onBlur={() => setFocused(null)}
          style={inputStyle('birthday')}
        />

        {/* Email */}
        <div style={{ position: 'relative' }}>
          <input
            type="email"
            value={form.email}
            onChange={set('email')}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused(null)}
            style={{ ...inputStyle('email'), paddingRight: '40px' }}
          />
          <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            <MailIcon />
          </div>
        </div>

        {/* Country */}
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            value={form.country}
            onChange={set('country')}
            onFocus={() => setFocused('country')}
            onBlur={() => setFocused(null)}
            style={{ ...inputStyle('country'), paddingRight: '40px' }}
          />
          <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            <GlobeIcon />
          </div>
        </div>

      </div>
    </div>
  )
}
