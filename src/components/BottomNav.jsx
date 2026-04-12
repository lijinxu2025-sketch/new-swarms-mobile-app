// ─── Assets (from Figma node 11056:1132) ──────────────────────────
const ASSETS = {
  chat:       '/image/bottomnav_chat.svg',
  profile:    '/image/bottomnav_profile.svg',
  launch:     '/image/bottomnav_launch.svg',
  trending:   '/image/bottomnav_trending.svg',
  bgTexture:  '/image/bottomnav_bgtexture.png',
}

export default function BottomNav({ activeTab = 'home', onChat, onProfile, onLaunch, onTrending, onSettings }) {
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
        {/* Glassmorphic bg: gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(17,17,17,0.7))',
            borderRadius: '10px',
          }}
        />
        {/* Texture image at 10% opacity */}
        <img
          src={ASSETS.bgTexture}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.1, backdropFilter: 'blur(4.5px)', borderRadius: '10px' }}
        />

        {/* Buttons row */}
        <div className="relative z-10 h-full flex items-center justify-between" style={{ padding: '6px' }}>

          {/* Chat */}
          <button
            onClick={onChat}
            className="flex items-center justify-center border-0 cursor-pointer"
            style={{ background: '#1f1f1f', borderRadius: '10px', padding: '15px' }}
          >
            <img src={ASSETS.chat} alt="Chat" style={{ width: '22px', height: '22px' }} />
          </button>

          {/* Profile */}
          <button
            onClick={onProfile}
            className="flex items-center justify-center border-0 cursor-pointer"
            style={{ background: '#1f1f1f', borderRadius: '10px', padding: '15px' }}
          >
            <img src={ASSETS.profile} alt="Profile" style={{ width: '24px', height: '24px' }} />
          </button>

          {/* Launch — red center button */}
          <button
            onClick={onLaunch}
            className="flex items-center justify-center border-0 cursor-pointer"
            style={{
              background: '#ed1717',
              borderRadius: '10px',
              width: '52px',
              height: '52px',
              padding: '0',
            }}
          >
            <img src={ASSETS.launch} alt="Launch" style={{ width: '20px', height: '20px' }} />
          </button>

          {/* Trending / Grid */}
          <button
            onClick={onTrending}
            className="flex items-center justify-center border-0 cursor-pointer"
            style={{ background: '#1f1f1f', borderRadius: '10px', padding: '15px' }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="0.75" y="0.75" width="6.32" height="6.32" rx="2" stroke="#aaaaab" strokeWidth="1.5" />
              <rect x="0.75" y="10.75" width="6.32" height="6.32" rx="2" stroke="#aaaaab" strokeWidth="1.5" />
              <rect x="10.75" y="10.75" width="6.32" height="6.32" rx="2" stroke="#aaaaab" strokeWidth="1.5" />
              <rect x="11.07" y="3.8" width="5.38" height="5.38" rx="1" stroke="#aaaaab" strokeWidth="1.5" transform="rotate(-45 11.07 3.8)" />
            </svg>
          </button>

          {/* Settings */}
          <button
            onClick={onSettings}
            className="flex items-center justify-center border-0 cursor-pointer"
            style={{ background: '#1f1f1f', borderRadius: '10px', padding: '15px' }}
          >
            <img src={ASSETS.trending} alt="Settings" style={{ width: '24px', height: '24px' }} />
          </button>

        </div>
      </div>
    </div>
  )
}
