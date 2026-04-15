import StatusBar from '../components/StatusBar'

// ─── Figma assets ────────────────────────────────────────────────────
const ICON_MARKETPLACE   = 'https://www.figma.com/api/mcp/asset/a99986e4-9469-422b-9b9d-c9383fb4cc74'
const ICON_CREDITS       = 'https://www.figma.com/api/mcp/asset/592e0ee1-0068-41de-a80f-04716d250b5c'
const ICON_SUBSCRIPTION  = 'https://www.figma.com/api/mcp/asset/dee1db66-0dad-4b7b-935f-dbd46760413e'
const ICON_CHEVRON       = 'https://www.figma.com/api/mcp/asset/f5be9e51-647f-4e2d-a12e-52912d7a8506'
const ICON_RECEIPT       = 'https://www.figma.com/api/mcp/asset/1aa59b34-f10f-4d44-96f0-2cf1004c357a'

function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
    </svg>
  )
}

const mono = { fontFamily: 'Montserrat, sans-serif' }

const STATS = [
  { icon: ICON_MARKETPLACE,  label: 'Marketplace',  value: '0'    },
  { icon: ICON_CREDITS,      label: 'Credits',       value: '0'    },
  { icon: ICON_SUBSCRIPTION, label: 'Subscription',  value: 'None' },
]

export default function PurchasesPage({ onBack }) {
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
        <span style={{ ...mono, fontWeight: 600, fontSize: '16px', color: '#fff', flex: 1, textAlign: 'center', marginRight: '24px' }}>
          Purchases
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Stat cards */}
        {STATS.map(({ icon, label, value }) => (
          <div key={label} style={{
            background: '#111', borderRadius: '8px', padding: '16px',
            height: '96px', boxSizing: 'border-box',
            display: 'flex', alignItems: 'center', gap: '18px',
          }}>
            <img src={icon} alt={label} style={{ width: '36px', height: '36px', objectFit: 'contain', flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p style={{ ...mono, fontWeight: 400, fontSize: '14px', color: '#999', margin: 0 }}>{label}</p>
              <p style={{ ...mono, fontWeight: 700, fontSize: '24px', lineHeight: '32px', color: '#fff', margin: 0 }}>{value}</p>
            </div>
          </div>
        ))}

        {/* Subscription section header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
          <span style={{ ...mono, fontWeight: 400, fontSize: '16px', color: '#fff' }}>Subscription</span>
          <img src={ICON_CHEVRON} alt="" style={{ width: '24px', height: '24px' }} />
        </div>

        {/* Empty state card */}
        <div style={{
          background: '#111', borderRadius: '8px', padding: '16px',
          height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <img src={ICON_RECEIPT} alt="" style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
            <div style={{ textAlign: 'center' }}>
              <p style={{ ...mono, fontWeight: 400, fontSize: '16px', lineHeight: '24px', color: '#737373', margin: 0 }}>No transactions yet</p>
              <p style={{ ...mono, fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: '#737373', margin: 0 }}>Your transaction history will appear here</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
