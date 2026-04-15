import { useState } from 'react'
import StatusBar from '../components/StatusBar'

// ─── Assets ────────────────────────────────────────────────────────
const ASSETS = {
  iconBack:     '/image/config_iconBack.svg',
  iconChevron:  '/image/config_iconChevron.svg',
  iconAgentA:   '/image/config_iconAgentA.svg',
  iconAgentB:   '/image/config_iconAgentB.svg',
  iconSettings: '/image/config_iconSettings.svg',
  iconMarket:   '/image/config_iconMarket.svg',
  iconAdd:      '/image/config_iconAdd.svg',
}

const AGENTS = [
  {
    icon: 'iconAgentA',
    name: 'Market Insights Analyst',
    desc: 'A specialized AI agent focused on providing detailed 1insight...',
  },
  {
    icon: 'iconAgentB',
    name: 'Customer Support Assistant',
    desc: 'A prompt designed to help AI assist users by providing polit...',
  },
]

// ─── Sub-components ────────────────────────────────────────────────
function InputField({ label, value, onChange, placeholder }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '14px', color: '#fff', lineHeight: '21px' }}>
        {label}
      </span>
      <div style={{ background: '#111', borderRadius: '8px', height: '44px', display: 'flex', alignItems: 'center', padding: '10px 12px' }}>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            color: value ? '#fff' : '#777',
            lineHeight: '26px',
          }}
        />
      </div>
    </div>
  )
}

function SelectField({ label, value, showChevron }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500, fontSize: '14px', color: '#fff', lineHeight: '21px' }}>
        {label}
      </span>
      <div style={{ background: '#111', borderRadius: '8px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px' }}>
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '16px', color: '#777', lineHeight: '26px' }}>
          {value}
        </span>
        {showChevron && (
          <img src={ASSETS.iconChevron} alt="" style={{ width: '24px', height: '24px', transform: 'rotate(90deg)' }} />
        )}
      </div>
    </div>
  )
}

function AgentCard({ iconKey, name, desc }) {
  return (
    <div
      style={{
        background: '#111',
        borderRadius: '8px',
        padding: '20px 10px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      {/* Avatar box */}
      <div
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '12px',
          border: '1px solid #333',
          flexShrink: 0,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={ASSETS[iconKey]} alt="" style={{ width: '17.54px', height: '17.54px' }} />
        {/* Green dot */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '9px',
            height: '9px',
            borderRadius: '50%',
            background: '#22c55e',
          }}
        />
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            fontSize: '14px',
            color: '#fff',
            lineHeight: '24px',
            whiteSpace: 'nowrap',
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 400,
            fontSize: '10px',
            color: '#a1a1aa',
            lineHeight: '14px',
          }}
        >
          {desc}
        </span>
      </div>

      {/* Settings icon */}
      <img src={ASSETS.iconSettings} alt="" style={{ width: '20px', height: '20px', flexShrink: 0 }} />
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────
export default function ConfigPage({ onBack }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const canSave = name.trim().length > 0 || description.trim().length > 0

  return (
    <div
      style={{
        width: '375px',
        height: '812px',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: 'Montserrat, sans-serif',
        margin: '0 auto',
      }}
    >
      <StatusBar />

      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 24px',
          flexShrink: 0,
        }}
      >
        <button
          onClick={onBack}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, width: '24px', height: '24px' }}
        >
          <img src={ASSETS.iconBack} alt="Back" style={{ width: '24px', height: '24px' }} />
        </button>
        <div style={{ flex: 1 }} />
        <span
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            color: canSave ? '#fff' : '#999',
            lineHeight: '26px',
            opacity: canSave ? 1 : 0.5,
            cursor: canSave ? 'pointer' : 'default',
            transition: 'color 0.2s, opacity 0.2s',
          }}
        >
          Save
        </span>
      </div>

      {/* Scrollable content */}
      <div
        className="scroll-hide"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0 24px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
        }}
      >
        {/* Top fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <InputField label="Name" value={name} onChange={setName} placeholder="Swarms" />
          <InputField label="Description" value={description} onChange={setDescription} placeholder="Enter description" />
          <SelectField label="Swarm Type" value="Concurrent" showChevron />
        </div>

        {/* Agents in Chat */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: '18px',
                color: '#fff',
                lineHeight: '26px',
              }}
            >
              Agents in Chat
            </span>
            <span
              style={{
                fontFamily: 'Helvetica, sans-serif',
                fontWeight: 400,
                fontSize: '12px',
                color: '#999',
                lineHeight: '21px',
              }}
            >
              Number of Agents: 2
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {AGENTS.map((agent, i) => (
              <AgentCard key={i} iconKey={agent.icon} name={agent.name} desc={agent.desc} />
            ))}
          </div>
        </div>

        {/* Add from Marketplace */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              fontSize: '18px',
              color: '#fff',
              lineHeight: '26px',
            }}
          >
            Add from Marketplace
          </span>
          <div
            style={{
              background: '#111',
              borderRadius: '8px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 12px',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <img src={ASSETS.iconMarket} alt="" style={{ width: '16px', height: '16px' }} />
              <span
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  color: '#fff',
                }}
              >
                Browse Marketplace
              </span>
            </div>
          </div>
        </div>

        {/* Add Custom Agent */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              fontSize: '18px',
              color: '#fff',
              lineHeight: '26px',
            }}
          >
            Add Custom Agent
          </span>
          <div
            style={{
              background: '#111',
              borderRadius: '8px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 12px',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <img src={ASSETS.iconAdd} alt="" style={{ width: '20px', height: '20px' }} />
              <span
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  color: '#fff',
                }}
              >
                Create Custom Agent
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
