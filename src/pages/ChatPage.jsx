import { useState, useRef, useEffect } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'

// ─── Assets ────────────────────────────────────────────────────────
const ASSETS = {
  // Header icons
  iconEdit:     '/image/chat_iconEdit.svg',
  iconMenu:     '/image/chat_iconMenu.svg',
  // Center logo (empty state)
  swarmsIcon:   '/image/chat_swarmsIcon.svg',
  // Input bar
  iconAttach:   '/image/chat_iconAttach.svg',
  iconMic:      '/image/chat_iconMic.svg',
  iconArrow:    '/image/chat_iconArrow.svg',
  // Assistant message
  avatarSwarms: '/image/chat_avatarSwarms.svg',
  iconSound:    '/image/chat_iconSound.svg',
  iconCopy:     '/image/chat_iconCopy.svg',
  iconSync:     '/image/chat_iconSync.svg',
  iconThumbDown:'/image/chat_iconThumbDown.svg',
  iconDelete:   '/image/chat_iconDelete.svg',
  // Drawer
  iconSearch:   '/image/chat_iconSearch.svg',
  iconNewChat:  '/image/chat_iconNewChat.svg',
  iconCompose:  '/image/chat_iconCompose.svg',
  iconConfig:   '/image/chat_iconConfig.svg',
}

const CONVERSATIONS = [
  { label: 'Current conversation', active: true },
  { label: 'Previous conversation' },
  { label: 'Previous conversation' },
  { label: 'Previous conversation' },
  { label: 'Previous conversation' },
  { label: 'Previous conversation' },
  { label: 'Previous conversation' },
  { label: 'Previous conversation' },
  { label: 'Previous conversation' },
  { label: 'Previous conversation' },
  { label: 'Previous conversation' },
  { label: 'Previous conversation' },
]

// ─── Sub-components ────────────────────────────────────────────────
function Drawer({ open, onClose, onConfig }) {
  return (
    <>
      {/* Dim overlay */}
      {open && (
        <div
          onClick={onClose}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 20,
          }}
        />
      )}

      {/* Slide-in panel */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '281px',
          zIndex: 30,
          background: '#1f1f1f',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        {/* Header section */}
        <div
          style={{
            background: '#111',
            padding: '61px 16px 14px',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          {/* Search input */}
          <div
            style={{
              background: '#1f1f1f',
              borderRadius: '80px',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <img src={ASSETS.iconSearch} alt="" style={{ width: '20px', height: '20px', flexShrink: 0 }} />
            <span
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 500,
                fontSize: '14px',
                color: '#555',
                lineHeight: '20px',
                flex: 1,
              }}
            >
              Search for chats
            </span>
          </div>

          {/* New Chat row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <img src={ASSETS.iconNewChat} alt="" style={{ width: '16px', height: '16px' }} />
              <span
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  color: '#fff',
                  lineHeight: '21px',
                }}
              >
                New Chat
              </span>
            </div>
            <div
              style={{
                background: '#111',
                borderRadius: '200px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <img src={ASSETS.iconCompose} alt="" style={{ width: '16px', height: '16px' }} />
            </div>
          </div>

          {/* Config row */}
          <div
            onClick={() => { onClose(); onConfig && onConfig() }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
          >
            <img src={ASSETS.iconConfig} alt="" style={{ width: '16px', height: '16px' }} />
            <span
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: '14px',
                color: '#fff',
                lineHeight: '21px',
              }}
            >
              Config
            </span>
          </div>
        </div>

        {/* Chat list */}
        <div
          style={{
            background: '#111',
            flex: 1,
            overflowY: 'auto',
            padding: '10px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
          className="scroll-hide"
        >
          <span
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              fontSize: '14px',
              color: 'rgba(255,255,255,0.9)',
              lineHeight: '21px',
            }}
          >
            Chats
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {CONVERSATIONS.map((item, i) => (
              <div
                key={i}
                style={{
                  background: item.active ? '#1f1f1f' : 'transparent',
                  borderRadius: '80px',
                  padding: '8px 12px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 400,
                    fontSize: '12px',
                    color: '#fff',
                    lineHeight: '18px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function UserBubble({ text }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <div
        style={{
          background: '#111',
          borderRadius: '8px 8px 2px 8px',
          padding: '8px',
          maxWidth: '250px',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 400,
          fontSize: '14px',
          color: '#fff',
          lineHeight: '21px',
        }}
      >
        {text}
      </div>
    </div>
  )
}

function AssistantBubble({ text }) {
  const actions = [
    ASSETS.iconSound,
    ASSETS.iconCopy,
    ASSETS.iconSync,
    ASSETS.iconThumbDown,
    ASSETS.iconDelete,
  ]
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
      {/* Avatar */}
      <div
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '5000px',
          background: '#111',
          border: '0.5px solid #424242',
          padding: '4px',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={ASSETS.avatarSwarms} alt="" style={{ width: '16px', height: '16px' }} />
      </div>

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, minWidth: 0 }}>
        <span
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            color: '#fff',
            lineHeight: '26px',
          }}
        >
          swarms assistant
        </span>
        <p
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 400,
            fontSize: '14px',
            color: '#fff',
            lineHeight: '21px',
            margin: 0,
          }}
        >
          {text}
        </p>
        {/* Action icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '4px' }}>
          {actions.map((icon, i) => (
            <button
              key={i}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, width: '16px', height: '16px' }}
            >
              <img src={icon} alt="" style={{ width: '16px', height: '16px' }} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Typewriter hook ────────────────────────────────────────────────
const FULL_TEXT = 'How can i help you today'

function useTypewriter(active) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const timerRef = useRef(null)
  const iRef = useRef(0)

  useEffect(() => {
    clearTimeout(timerRef.current)
    if (!active) {
      setDisplayed('')
      setDone(false)
      iRef.current = 0
      return
    }
    // reset and start fresh
    iRef.current = 0
    setDisplayed('')
    setDone(false)

    function tick() {
      iRef.current += 1
      const next = iRef.current
      setDisplayed(FULL_TEXT.slice(0, next))
      if (next < FULL_TEXT.length) {
        timerRef.current = setTimeout(tick, 60)
      } else {
        setDone(true)
      }
    }
    // initial delay before first character
    timerRef.current = setTimeout(tick, 500)
    return () => clearTimeout(timerRef.current)
  }, [active])

  return { displayed, done }
}

// ─── Page ──────────────────────────────────────────────────────────
export default function ChatPage({ onLaunch, onProfile, onTrending, onSettings, onHome, onConfig }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [inputFocused, setInputFocused] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleSend() {
    const text = input.trim()
    if (!text) return
    setMessages(prev => [...prev, { role: 'user', text }])
    setInput('')
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: 'Swarms is the enterprise-grade, production-ready multi-agent orchestration framework created by kyegomez. Build, deploy....',
        },
      ])
    }, 800)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const isEmpty = messages.length === 0
  const hasText = input.trim().length > 0
  // greeting visible whenever no messages sent; focus/typing only affects position
  const { displayed, done } = useTypewriter(isEmpty)

  return (
    <div
      className="flex flex-col relative overflow-hidden"
      style={{ width: '375px', height: '812px', background: '#0a0a0a', margin: '0 auto' }}
    >
      {/* Status Bar */}
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
          onClick={() => setDrawerOpen(true)}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <img src={ASSETS.iconMenu} alt="Menu" style={{ width: '24px', height: '24px' }} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '16px', color: '#fff', lineHeight: '26px' }}>
            swarms chat
          </span>
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '16px', color: '#fff', lineHeight: '26px' }}>
            V1
          </span>
        </div>
        <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={ASSETS.iconEdit} alt="New Chat" style={{ width: '24px', height: '24px' }} />
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto scroll-hide" style={{ padding: '0 24px 8px' }}>
        {isEmpty ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '32px',
            justifyContent: 'flex-start',
            paddingTop: '80px',
            height: '100%',
          }}>
            <style>{`
              @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
            `}</style>

            {/* Swarms logo */}
            <img
              src={ASSETS.swarmsIcon}
              alt="Swarms"
              style={{ width: '46px', height: '46px' }}
            />

            {/* Typewriter text */}
            <p style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              fontSize: '20px',
              lineHeight: '28px',
              color: '#fff',
              margin: 0,
              textAlign: 'center',
              whiteSpace: 'nowrap',
              minHeight: '28px',
            }}>
              {displayed}
              {!done && (
                <span style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '20px',
                  background: '#fff',
                  marginLeft: '2px',
                  verticalAlign: 'middle',
                  animation: 'blink 0.7s step-end infinite',
                }} />
              )}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '16px' }}>
            {messages.map((msg, i) =>
              msg.role === 'user'
                ? <UserBubble key={i} text={msg.text} />
                : <AssistantBubble key={i} text={msg.text} />
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input bar */}
      <div style={{ padding: '0 24px 12px', flexShrink: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            border: '1.048px solid #333',
            borderRadius: '16px',
            paddingTop: '12px',
            paddingBottom: '12px',
            paddingLeft: '20px',
            paddingRight: '12px',
            gap: '16px',
          }}
        >
          <div style={{ position: 'relative', width: '24px', height: '24px', flexShrink: 0 }}>
            <img src={ASSETS.iconAttach} alt="Attach" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
          </div>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            placeholder="Enter your message..."
            style={{
              flex: '1 0 0',
              minWidth: '1px',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              color: '#fff',
              lineHeight: '21px',
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
            {/* Mic */}
            <div
              style={{
                border: '1px solid #333',
                borderRadius: '7.569px',
                padding: '7.569px',
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              <div style={{ position: 'relative', width: '18px', height: '18px', flexShrink: 0 }}>
                <img src={ASSETS.iconMic} alt="Mic" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
              </div>
            </div>
            {/* Send */}
            <button
              onClick={handleSend}
              style={{
                background: hasText ? '#fff' : '#1f1f1f',
                borderRadius: '8px',
                padding: '8px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'flex-start',
                transition: 'background 0.15s',
              }}
            >
              <div style={{ position: 'relative', width: '17px', height: '17px', flexShrink: 0, filter: hasText ? 'invert(1)' : 'none' }}>
                <img src={ASSETS.iconArrow} alt="Send" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <BottomNav
        activeTab="chat"
        onChat={() => {}}
        onProfile={onProfile}
        onLaunch={onLaunch}
        onTrending={onTrending}
        onSettings={onSettings}
      />

      {/* Drawer */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onConfig={onConfig} />
    </div>
  )
}
