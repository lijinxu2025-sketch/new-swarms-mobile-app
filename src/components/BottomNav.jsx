// ─── Assets ────────────────────────────────────────────────────────
const ASSETS = {
  // Chat: outline = inactive, active = filled
  chatOutline:    '/image/bottomnav_chat.svg',
  chatActive:     '/image/bottomnav_chat_active.svg',
  // Home: filled = active, outline = inactive
  homeActive:     '/image/bottomnav_profile.svg',
  homeOutline:    '/image/bottomnav_profile_outline.svg',
  // Center launch button
  launch:         '/image/bottomnav_launch.svg',
  // Settings gear: outline / active
  settingsOutline: '/image/bottomnav_trending.svg',
  settingsActive:  '/image/bottomnav_settings_active.svg',
  bgTexture:      '/image/bottomnav_bgtexture.png',
}

// Active tab values: 'chat' | 'home' | 'trending' | 'settings'
// The launch button (center) has no active state.

export default function BottomNav({ activeTab = 'home', onChat, onProfile, onLaunch, onTrending, onSettings }) {
  const isActive = (tab) => activeTab === tab

  // Button style: active tab gets a slightly lighter background to match Figma
  const btnStyle = (tab) => ({
    background: '#1f1f1f',
    borderRadius: '10px',
    padding: '15px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })

  return (
    <div className="shrink-0 relative" style={{ height: '89px' }}>
      {/* Gradient fade above nav */}
      <div
        className="absolute left-0 right-0 top-0 pointer-events-none"
        style={{
          height: '89px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, black 80.3%)',
        }}
      />

      {/* Nav container */}
      <div
        className="absolute overflow-hidden"
        style={{
          bottom: '23px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 48px)',
          maxWidth: '327px',
          height: '66px',
          borderRadius: '10px',
          border: '1px solid rgba(64,64,64,0.4)',
        }}
      >
        {/* Glassmorphic bg */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(17,17,17,0.7))',
            borderRadius: '10px',
          }}
        />
        <img
          src={ASSETS.bgTexture}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.1, backdropFilter: 'blur(4.5px)', borderRadius: '10px' }}
        />

        {/* Buttons row */}
        <div className="relative z-10 h-full flex items-center justify-between" style={{ padding: '6px' }}>

          {/* 1 — Chat */}
          <button onClick={onChat} style={btnStyle('chat')}>
            <img
              src={isActive('chat') ? ASSETS.chatActive : ASSETS.chatOutline}
              alt="Chat"
              style={{ width: '22px', height: '22px' }}
            />
          </button>

          {/* 2 — Home */}
          <button onClick={onProfile} style={btnStyle('home')}>
            <img
              src={isActive('home') ? ASSETS.homeActive : ASSETS.homeOutline}
              alt="Home"
              style={{ width: '24px', height: '24px' }}
            />
          </button>

          {/* 3 — Launch (red center, no active state) */}
          <button
            onClick={onLaunch}
            style={{
              background: '#ed1717',
              borderRadius: '10px',
              width: '52px',
              height: '52px',
              padding: '0',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src={ASSETS.launch} alt="Launch" style={{ width: '20px', height: '20px' }} />
          </button>

          {/* 4 — Trending / Grid */}
          <button onClick={onTrending} style={btnStyle('trending')}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="0.75"  y="0.75"  width="6.32" height="6.32" rx="2"
                stroke={isActive('trending') ? 'white' : '#aaaaab'} strokeWidth="1.5"
                fill={isActive('trending') ? 'white' : 'none'} />
              <rect x="0.75"  y="10.75" width="6.32" height="6.32" rx="2"
                stroke={isActive('trending') ? 'white' : '#aaaaab'} strokeWidth="1.5"
                fill={isActive('trending') ? 'white' : 'none'} />
              <rect x="10.75" y="10.75" width="6.32" height="6.32" rx="2"
                stroke={isActive('trending') ? 'white' : '#aaaaab'} strokeWidth="1.5"
                fill={isActive('trending') ? 'white' : 'none'} />
              <rect x="11.07" y="3.8" width="5.38" height="5.38" rx="1"
                stroke={isActive('trending') ? 'white' : '#aaaaab'} strokeWidth="1.5"
                transform="rotate(-45 11.07 3.8)"
                fill={isActive('trending') ? 'white' : 'none'} />
            </svg>
          </button>

          {/* 5 — Settings */}
          <button onClick={onSettings} style={btnStyle('settings')}>
            <img
              src={isActive('settings') ? ASSETS.settingsActive : ASSETS.settingsOutline}
              alt="Settings"
              style={{ width: '24px', height: '24px' }}
            />
          </button>

        </div>
      </div>
    </div>
  )
}
