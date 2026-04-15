import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'

// ─── Assets (Figma node 11399:9485) ────────────────────────────────
const ASSETS = {
  iconEditProfile:  '/image/settings_iconEditProfile.svg',
  iconBilling:      '/image/settings_iconBilling.svg',
  iconPurchases:    '/image/settings_iconPurchases.svg',
  iconStaking:      '/image/settings_iconStaking.svg',
  iconSocialLinks:  '/image/settings_iconSocialLinks.svg',
  iconTheme:        '/image/settings_iconTheme.svg',
  iconReferral:     '/image/settings_iconReferral.svg',
  iconChevron:      '/image/settings_iconChevron.svg',
}

export default function SettingsPage({ onChat, onHome, onLaunch, onTrending, onEditProfile, onBilling, onPurchases, onStaking, onSocialLinks, onTheme, onReferral, onLogout }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const MENU_ITEMS = [
    { label: 'Edit Profile',  icon: ASSETS.iconEditProfile,  onPress: onEditProfile  },
    { label: 'Billing',       icon: ASSETS.iconBilling,      onPress: onBilling      },
    { label: 'Purchases',     icon: ASSETS.iconPurchases,    onPress: onPurchases    },
    { label: 'Staking',       icon: ASSETS.iconStaking,      onPress: onStaking      },
    { label: 'Social Links',  icon: ASSETS.iconSocialLinks,  onPress: onSocialLinks  },
    { label: 'Theme',         icon: ASSETS.iconTheme,        onPress: onTheme        },
    { label: 'Referral',      icon: ASSETS.iconReferral,     onPress: onReferral     },
  ]
  return (
    <div
      className="flex flex-col relative overflow-hidden"
      style={{ width: '375px', height: '812px', background: '#0a0a0a', margin: '0 auto' }}
    >
      <StatusBar />

      {/* Avatar + Name */}
      <div className="flex flex-col items-center" style={{ marginTop: '60px', gap: '16px' }}>
        {/* Avatar circle */}
        <div
          className="flex items-center justify-center rounded-[42px]"
          style={{ width: '84px', height: '84px', background: '#c1392b' }}
        >
          <span style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 400,
            fontSize: '32px',
            color: '#fff',
          }}>
            CA
          </span>
        </div>
        {/* Name */}
        <p style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 500,
          fontSize: '24px',
          color: '#fff',
          lineHeight: 'normal',
        }}>
          Carson li
        </p>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '24px 24px 0' }} />

      {/* Menu List */}
      <div
        className="flex flex-col"
        style={{ padding: '20px 24px 0', gap: '20px', flex: 1, overflowY: 'auto' }}
      >
        {MENU_ITEMS.map((item) => (
          <button
            key={item.label}
            onClick={item.onPress || undefined}
            className="flex items-center justify-between w-full"
            style={{ background: 'none', border: 'none', cursor: item.onPress ? 'pointer' : 'default', padding: 0 }}
          >
            <div className="flex items-center" style={{ gap: '10px' }}>
              <img src={item.icon} alt={item.label} style={{ width: '24px', height: '24px' }} />
              <span style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                color: '#fff',
                lineHeight: '21px',
                whiteSpace: 'nowrap',
              }}>
                {item.label}
              </span>
            </div>
            <img src={ASSETS.iconChevron} alt="›" style={{ width: '24px', height: '24px' }} />
          </button>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '0 24px 20px' }} />

      {/* Logout Button */}
      <div style={{ padding: '0 24px 16px' }}>
        <button
          className="w-full flex items-center justify-center"
          onClick={() => setShowLogoutModal(true)}
          style={{
            height: '58px',
            background: '#111',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            fontSize: '16px',
            color: '#fff',
          }}
        >
          Logout
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div
          className="absolute inset-0"
          style={{ zIndex: 50 }}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.6)' }}
            onClick={() => setShowLogoutModal(false)}
          />
          {/* Bottom Sheet */}
          <div
            className="absolute left-0 right-0 bottom-0 flex flex-col items-center"
            style={{
              height: '284px',
              background: 'linear-gradient(180deg, #1a1a1a 0%, #111 100%)',
              borderRadius: '24px 24px 0 0',
            }}
          >
            {/* Title + Subtitle */}
            <div
              className="flex flex-col items-center"
              style={{ marginTop: '34px', gap: '13px', width: '246px' }}
            >
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: '18px',
                lineHeight: '27px',
                color: '#fff',
                textAlign: 'center',
              }}>
                Logout confirmation
              </p>
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '21px',
                color: '#999',
                textAlign: 'center',
              }}>
                Are you sure you want to sign out?
              </p>
            </div>

            {/* Logout (confirm) Button */}
            <button
              onClick={() => { setShowLogoutModal(false); onLogout && onLogout() }}
              style={{
                marginTop: '20px',
                width: '327px',
                height: '46px',
                background: '#ed1717',
                borderRadius: '16px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: '16px',
                color: '#fff',
              }}
            >
              Logout
            </button>

            {/* Cancel Button */}
            <button
              onClick={() => setShowLogoutModal(false)}
              style={{
                marginTop: '8px',
                width: '327px',
                height: '46px',
                background: '#1f1f1f',
                borderRadius: '16px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: '16px',
                color: '#fff',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <BottomNav
        activeTab="settings"
        onChat={onChat}
        onProfile={onHome}
        onLaunch={onLaunch}
        onTrending={onTrending}
        onSettings={() => {}}
      />
    </div>
  )
}
