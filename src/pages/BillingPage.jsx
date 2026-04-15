import StatusBar from '../components/StatusBar'

// ─── Figma assets ────────────────────────────────────────────────────
const ICON_CHEVRON    = 'https://www.figma.com/api/mcp/asset/70cb714c-c13b-4edb-8b6b-1a53906c3267'
const ICON_MASTERCARD = 'https://www.figma.com/api/mcp/asset/4a99ae30-8e83-42e3-9f62-ebb3298cc99e'
const ICON_PHANTOM    = 'https://www.figma.com/api/mcp/asset/0cb975aa-88c9-4cbb-ae4c-342f449e6f45'

function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
    </svg>
  )
}

const PAYMENT_METHODS = [
  { icon: ICON_MASTERCARD, label: 'Mastercard', iconW: 32, iconH: 24 },
  { icon: ICON_PHANTOM,    label: 'phantom',    iconW: 32, iconH: 32 },
]

const mono = { fontFamily: 'Montserrat, sans-serif' }

export default function BillingPage({ onBack }) {
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
          Billing
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

        {/* Current Balance card */}
        <div style={{ background: '#111', borderRadius: '8px', padding: '16px', height: '105px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px' }}>
          <p style={{ ...mono, fontWeight: 400, fontSize: '14px', color: '#fff', margin: 0 }}>Current Balance</p>
          <p style={{ ...mono, fontWeight: 700, fontSize: '24px', color: '#fff', margin: 0 }}>$19.91USD</p>
          <p style={{ ...mono, fontWeight: 400, fontSize: '10px', color: '#fff', margin: 0 }}>Available credits for API usage</p>
        </div>

        {/* Add Credits row */}
        <div style={{ background: '#111', borderRadius: '8px', height: '48px', padding: '8px 16px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ ...mono, fontWeight: 400, fontSize: '14px', lineHeight: '21px', color: '#fff' }}>Add Credits</span>
          <img src={ICON_CHEVRON} alt="" style={{ width: '24px', height: '24px' }} />
        </div>

        {/* Payment Methods */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ ...mono, fontWeight: 400, fontSize: '16px', color: '#fff' }}>Payment Methods</span>
            <img src={ICON_CHEVRON} alt="" style={{ width: '24px', height: '24px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {PAYMENT_METHODS.map(({ icon, label, iconW, iconH }) => (
              <div key={label} style={{
                background: 'rgba(255,255,255,0.08)', borderRadius: '8px',
                height: '64px', padding: '18px 16px', boxSizing: 'border-box',
                display: 'flex', alignItems: 'center', gap: '10px',
              }}>
                <img src={icon} alt={label} style={{ width: iconW, height: iconH, objectFit: 'contain', flexShrink: 0 }} />
                <span style={{ ...mono, fontWeight: 400, fontSize: '16px', color: '#fff' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
