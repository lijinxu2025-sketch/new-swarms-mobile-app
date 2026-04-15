import { useState } from 'react'
import StatusBar from '../components/StatusBar'

// ─── Figma assets ───────────────────────────────────────────────────
const ICON_PEOPLE   = 'https://www.figma.com/api/mcp/asset/966b1d2c-6a44-48de-806d-5fa330a8d7b7'
const ICON_COPY     = 'https://www.figma.com/api/mcp/asset/f31894bd-23b4-46c1-904d-2107e28bfa42'
const ICON_CONTRACT = 'https://www.figma.com/api/mcp/asset/e6424faa-9095-45c5-8907-dfc10e26ba2b'
const BG_CARD       = 'https://www.figma.com/api/mcp/asset/67054464-4c84-432b-b218-f8e52daaacf3'
const BG_PROCESSING = 'https://www.figma.com/api/mcp/asset/0141f7ba-7794-4ab8-91d4-a8cc443e4adb'

// ─── Share modal assets ─────────────────────────────────────────────
const ICON_X_CLOSE  = 'https://www.figma.com/api/mcp/asset/842caae1-1798-4817-94aa-e311d4d3a834'
const ICON_GITHUB   = 'https://www.figma.com/api/mcp/asset/a5cc5661-e733-4e42-9b23-eac6181198a1'
const ICON_FACEBOOK = 'https://www.figma.com/api/mcp/asset/c87f2734-2c07-429e-8655-ef6259b09631'
const ICON_TWITTER  = 'https://www.figma.com/api/mcp/asset/1262233d-be14-40fa-af64-6f531e91ef5d'
const ICON_LINKEDIN = 'https://www.figma.com/api/mcp/asset/59da7376-c58e-4f3d-a9f8-d01f7da3c2e0'
const ICON_GOOGLE   = 'https://www.figma.com/api/mcp/asset/8699b6b0-b5fd-41f0-8d89-3eed15fde6b1'
const ICON_LINK     = 'https://www.figma.com/api/mcp/asset/d1c1ea15-799d-464d-9a31-42b90343d1ab'

const SHARE_SOCIALS = [
  { img: ICON_GITHUB,   label: 'GitHub'   },
  { img: ICON_FACEBOOK, label: 'Facebook' },
  { img: ICON_TWITTER,  label: 'Twitter'  },
  { img: ICON_LINKEDIN, label: 'LinkedIn' },
  { img: ICON_GOOGLE,   label: 'Email'    },
]

// ─── Share link bottom sheet ────────────────────────────────────────
function ShareModal({ onClose }) {
  const [copied, setCopied] = useState(false)

  function handleCopyLink() {
    navigator.clipboard.writeText('https://swarms.world/signin....').catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 50 }}>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }}
      />
      {/* Bottom sheet */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: '#111', borderRadius: '7.5px 7.5px 0 0',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '15px',
          padding: '15px', borderBottom: '0.625px solid #333',
        }}>
          <span style={{
            flex: 1, fontFamily: 'Montserrat, sans-serif', fontWeight: 700,
            fontSize: '15px', color: '#fff',
          }}>
            Share link
          </span>
          <button
            onClick={onClose}
            style={{
              width: '15px', height: '15px', background: '#1f1f1f',
              borderRadius: '50%', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
            }}
          >
            <img src={ICON_X_CLOSE} alt="close" style={{ width: '10px', height: '10px' }} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '25px 15px 20px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {/* Social icons row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {SHARE_SOCIALS.map(({ img, label }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12.5px', width: '50px' }}>
                <img src={img} alt={label} style={{ width: '41.25px', height: '41.25px', objectFit: 'contain' }} />
                <span style={{
                  fontFamily: 'Montserrat, sans-serif', fontWeight: 500,
                  fontSize: '10px', color: '#999', textAlign: 'center', width: '100%',
                }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Copy link button */}
          <button
            onClick={handleCopyLink}
            style={{
              width: '100%', height: '31.25px',
              background: copied ? '#1f3a1f' : '#1f1f1f',
              border: 'none', borderRadius: '5px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7.5px',
              transition: 'background 0.2s',
            }}
          >
            <img src={ICON_LINK} alt="" style={{ width: '15px', height: '15px' }} />
            <span style={{
              fontFamily: 'Montserrat, sans-serif', fontWeight: 700,
              fontSize: '11.25px', color: '#fff',
            }}>
              {copied ? 'Copied!' : 'Copy link'}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
    </svg>
  )
}

// ─── Stat card ──────────────────────────────────────────────────────
function StatCard({ label, value }) {
  return (
    <div style={{
      background: '#111',
      borderRadius: '8px',
      padding: '16px 10px',
      height: '96px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '12px',
    }}>
      <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500, fontSize: '14px', color: '#fff', margin: 0 }}>
        {label}
      </p>
      <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '24px', lineHeight: '33px', color: '#fff', margin: 0 }}>
        {value}
      </p>
    </div>
  )
}

// ─── Activity card ──────────────────────────────────────────────────
function ActivityCard({ id, date, name, email, status }) {
  const badge = {
    Pending:    { bg: 'rgba(255,255,255,0.2)', border: 'rgba(255,255,255,0.5)', color: '#fff',     label: 'Pending',     img: null },
    Processing: { bg: null,                    border: null,                     color: '#c084fc',  label: 'Proccessing', img: BG_PROCESSING },
    Completed:  { bg: 'rgba(35,183,122,0.2)', border: '#23b77a',                color: '#23b77a',  label: 'Completed',   img: null },
  }[status]

  return (
    <div style={{ position: 'relative', width: '327px', height: '158px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
      {/* background */}
      <img src={BG_CARD} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />

      {/* top row: icon + id + date | badge */}
      <div style={{
        position: 'absolute', top: '20px', left: '8px', right: '8px',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
          {/* icon box */}
          <div style={{ position: 'relative', width: '44px', height: '44px', flexShrink: 0 }}>
            <div style={{ position: 'absolute', inset: 0, background: '#1f1f1f', borderRadius: '8px' }} />
            <img src={ICON_CONTRACT} alt="" style={{ position: 'absolute', top: '10px', left: '10px', width: '24px', height: '24px' }} />
          </div>
          {/* id + date */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '21px', color: '#fff', margin: 0 }}>
              {id}
            </p>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '10px', lineHeight: '14px', color: '#fff', margin: 0 }}>
              {date}
            </p>
          </div>
        </div>

        {/* badge */}
        <div style={{ position: 'relative', width: badge.img ? '84px' : '72px', height: '29px', flexShrink: 0 }}>
          {badge.img
            ? <img src={badge.img} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
            : <div style={{ position: 'absolute', inset: 0, background: badge.bg, border: `1px solid ${badge.border}`, borderRadius: '5px' }} />
          }
          <p style={{
            position: 'absolute', top: '9px', left: badge.img ? '11px' : '14px',
            fontFamily: 'Montserrat, sans-serif', fontWeight: 500, fontSize: '10px', color: badge.color,
            margin: 0, whiteSpace: 'nowrap',
          }}>
            {badge.label}
          </p>
        </div>
      </div>

      {/* name row */}
      <div style={{
        position: 'absolute', top: '84px', left: '8px', right: '8px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '21px', color: '#fff', margin: 0 }}>Name</p>
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '21px', color: '#999', margin: 0 }}>{name}</p>
      </div>

      {/* email row */}
      <div style={{
        position: 'absolute', top: '121px', left: '8px', right: '8px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '21px', color: '#fff', margin: 0 }}>Email</p>
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '21px', color: '#999', margin: 0 }}>{email}</p>
      </div>
    </div>
  )
}

// ─── Page ───────────────────────────────────────────────────────────
const REFERRAL_URL = 'https://swarms.world/signin....'

const ACTIVITY = [
  { id: '#P-01055', date: 'Oct11,2026', name: 'Carson li', email: 'Helloswarms@gmail.com', status: 'Pending'    },
  { id: '#P-01044', date: 'Oct11,2026', name: 'Leo',       email: 'Helloswarms@gmail.com', status: 'Processing' },
  { id: '#P-01033', date: 'Oct11,2026', name: 'Max',       email: 'Helloswarms@gmail.com', status: 'Completed'  },
]

export default function ReferralPage({ onBack }) {
  const [copied, setCopied]       = useState(false)
  const [showShare, setShowShare] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(REFERRAL_URL).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const mono = { fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }

  return (
    <div style={{
      width: '375px', height: '812px', background: '#000',
      margin: '0 auto', position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      <StatusBar />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '14px 24px', flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
          <BackIcon />
        </button>
        <span style={{
          fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: '16px',
          color: '#fff', flex: 1, textAlign: 'center', marginRight: '24px',
        }}>
          Referral
        </span>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

        {/* ── Refer Customers card ── */}
        <div style={{ background: '#111', borderRadius: '8px', padding: '16px 10px', display: 'flex', flexDirection: 'column', gap: '31px' }}>

          {/* People icon */}
          <div style={{ position: 'relative', width: '44px', height: '44px' }}>
            <div style={{ position: 'absolute', inset: 0, background: '#1f1f1f', borderRadius: '4px' }} />
            <img src={ICON_PEOPLE} alt="" style={{ position: 'absolute', top: '10px', left: '10px', width: '24px', height: '24px' }} />
          </div>

          {/* Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <p style={{ ...mono, fontSize: '18px', lineHeight: '29px', color: '#fff', margin: 0 }}>Refer Customers</p>
            <p style={{ ...mono, fontSize: '14px', lineHeight: '21px', color: '#fff', margin: 0 }}>
              Share this link with friends and earn rewards when they sign up
            </p>
          </div>

          {/* Link + Copy */}
          <div style={{
            background: '#1f1f1f', borderRadius: '4px 8px 8px 4px',
            height: '51px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '27px' }}>
              <p style={{ ...mono, fontSize: '12px', lineHeight: '18px', color: '#fff', margin: 0, whiteSpace: 'nowrap' }}>
                {REFERRAL_URL}
              </p>
              <button
                onClick={handleCopy}
                style={{
                  background: copied ? '#1f3a1f' : '#333', border: 'none', borderRadius: '8px',
                  width: '97px', height: '37px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  transition: 'background 0.2s',
                }}
              >
                <img src={ICON_COPY} alt="" style={{ width: '14px', height: '14px' }} />
                <span style={{ ...mono, fontSize: '12px', lineHeight: '18px', color: '#fff' }}>
                  {copied ? 'Copied!' : 'Copy'}
                </span>
              </button>
            </div>
          </div>

          {/* Share link button */}
          <button
            onClick={() => setShowShare(true)}
            style={{
              background: '#ed1717', border: 'none', borderRadius: '16px',
              height: '46px', width: '100%', cursor: 'pointer',
              fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '16px', color: '#fff',
            }}
          >
            Share link
          </button>
        </div>

        {/* ── Revenue overview ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500, fontSize: '14px', color: '#fff', margin: 0 }}>
            Revenue overview
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <StatCard label="Total Signups"    value="128" />
            <StatCard label="Credits Earned"   value="380" />
            <StatCard label="Active Referrals" value="46"  />
          </div>
        </div>

        {/* ── Referral Activity ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500, fontSize: '14px', color: '#fff', margin: 0 }}>
            Referral Activity
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {ACTIVITY.map(a => (
              <ActivityCard key={a.id} {...a} />
            ))}
          </div>
        </div>

      </div>

      {/* Share link modal */}
      {showShare && <ShareModal onClose={() => setShowShare(false)} />}
    </div>
  )
}
