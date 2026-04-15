import StatusBar from '../components/StatusBar'

function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
    </svg>
  )
}

const mono = { fontFamily: 'Montserrat, sans-serif' }

export default function StakingPage({ onBack }) {
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
          Stake
        </span>
      </div>

      {/* Card */}
      <div style={{
        margin: '0 24px',
        background: '#111', borderRadius: '8px',
        padding: '16px', display: 'flex', flexDirection: 'column', gap: '15px',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ ...mono, fontWeight: 700, fontSize: '18px', lineHeight: '27px', color: '#fff', margin: 0 }}>
              Stake SWARMS Tokens
            </p>
            <p style={{ ...mono, fontWeight: 400, fontSize: '14px', lineHeight: '21px', color: '#fff', margin: 0 }}>
              Stake your SWARMS tokens to the Swarms DAO address
            </p>
          </div>
          <p style={{ ...mono, fontWeight: 400, fontSize: '10px', lineHeight: '14px', color: '#fff', margin: 0 }}>
            Connect your Phantom wallet to start staking SWARMS tokens to the DAO.
          </p>
        </div>

        {/* Connect Phantom Wallet button */}
        <button style={{
          width: '100%', height: '46px',
          background: '#fff', border: 'none', borderRadius: '16px',
          cursor: 'pointer',
          ...mono, fontWeight: 400, fontSize: '16px', lineHeight: '26px', color: '#111',
        }}>
          Connect Phantom Wallet
        </button>
      </div>
    </div>
  )
}
