import { useState } from 'react'
import StatusBar from '../components/StatusBar'

// ─── Assets ────────────────────────────────────────────────────────
const ASSETS = {
  close: '/image/tradepage_close.svg',
  divider: '/image/tradepage_divider.svg',
  buyBg: '/image/tradepage_buybg.svg',
  solIcon: '/image/tradepage_solicon.png',
  tokenIcon: '/image/tradepage_tokenicon.png',
  walletIcon: '/image/tradepage_walleticon.svg',
  sheetBg: '/image/tradepage_sheetbg.svg',
}

const STATS = [
  { label: 'FDV', value: '$6.7K' },
  { label: 'Liquidity', value: '$5.3K' },
  { label: 'Holders', value: '311' },
  { label: '24h Vol', value: '$156.71' },
]

const PERCENTS = ['25%', '50%', '75%', 'MAX']

// ─── Page ──────────────────────────────────────────────────────────
const SOL_PRICE = 83.66
const WALLET_BALANCE = 5.32 // mock wallet balance in SOL
const TOKEN_RATE = 12094248.64 // tokens per SOL
const TOKEN_BALANCE = 12094248.64 // mock token balance
const SELL_SOL_RATE = 1 / TOKEN_RATE // SOL per token

export default function TradePage({ onClose }) {
  const [tab, setTab] = useState('buy')
  const [walletConnected, setWalletConnected] = useState(false)
  const [amount, setAmount] = useState('1')
  const [approved, setApproved] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const isSell = tab === 'sell'
  const numAmount = parseFloat(amount) || 0
  const balance = isSell ? TOKEN_BALANCE : WALLET_BALANCE
  const insufficientBalance = walletConnected && numAmount > balance
  const usdValue = isSell
    ? (numAmount * SELL_SOL_RATE * SOL_PRICE).toFixed(2)
    : (numAmount * SOL_PRICE).toFixed(2)
  const receiveAmount = isSell
    ? (numAmount * SELL_SOL_RATE).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : (numAmount * TOKEN_RATE).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  const handlePercent = (pct) => {
    if (!walletConnected) return
    const val = pct === 'MAX' ? balance : balance * (parseInt(pct) / 100)
    setAmount(parseFloat(val.toFixed(6)).toString())
  }

  const handleTabSwitch = (newTab) => {
    setTab(newTab)
    setAmount(newTab === 'sell' ? TOKEN_BALANCE.toString() : '1')
    setApproved(false)
    setShowToast(false)
  }

  return (
    <div className="flex flex-col h-full relative" style={{ background: '#0a0a0a', fontFamily: "'Montserrat', sans-serif" }}>
      <StatusBar />

      {/* Success toast */}
      {showToast && (
        <div
          className="absolute top-[56px] left-0 right-0 z-30 mx-0 flex items-center justify-between px-4 py-3"
          style={{ background: '#052e16', borderBottom: '1px solid #15803d' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#4ade80' }}>
              <span className="text-[#052e16] text-[14px] font-bold">✓</span>
            </div>
            <span className="text-white text-[14px]">{isSell ? 'Tokens approved!' : 'Approve Sol successfully'}</span>
          </div>
          <button onClick={() => setShowToast(false)} className="bg-transparent border-0 cursor-pointer p-0">
            <span className="text-white text-[18px]">✕</span>
          </button>
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 z-0" style={{ background: 'rgba(0,0,0,0.6)' }} />

      {/* Bottom sheet */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col" style={{ height: 614, borderRadius: '20px 20px 0 0', overflow: 'hidden' }}>
        {/* Background image */}
        <img src={ASSETS.sheetBg} alt="" className="absolute inset-0 w-full h-full object-cover" />

        {/* Content over bg */}
        <div className="relative z-10 flex flex-col h-full px-6">

          {/* Header: Trade + Close */}
          <div className="flex items-center justify-between pt-5 pb-3">
            <h2 className="text-white text-[20px] font-bold leading-[30px] m-0">Trade</h2>
            <button onClick={onClose} className="bg-transparent border-0 cursor-pointer p-0">
              <img src={ASSETS.close} alt="Close" className="w-6 h-6" />
            </button>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px]" style={{ background: '#333' }} />

          {/* Price */}
          <div className="flex items-center gap-3 mt-4">
            <span className="text-white text-[18px] leading-[29px]">$0.056688</span>
            <span className="text-[12px] font-medium" style={{ color: '#ed1717' }}>-7.7%</span>
          </div>

          {/* Stats row */}
          <div className="flex items-start justify-between mt-4">
            {STATS.map(s => (
              <div key={s.label} className="flex flex-col gap-2">
                <span className="text-[10px] leading-[15px]" style={{ color: '#999' }}>{s.label}</span>
                <span className="text-white text-[12px] font-medium leading-[1.2]">{s.value}</span>
              </div>
            ))}
          </div>

          {/* Buy / Sell toggle */}
          <div className="relative mt-5 h-[40px] rounded-[8px] overflow-hidden">
            <img src={ASSETS.buyBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="relative z-10 flex items-center h-full">
              <button
                onClick={() => handleTabSwitch('buy')}
                className="flex-1 h-full rounded-[8px] flex items-center justify-center border-0 cursor-pointer"
                style={{ background: tab === 'buy' ? '#4ade80' : 'transparent' }}
              >
                <span className="text-[16px] leading-[26px]" style={{ color: tab === 'buy' ? '#111' : 'white', opacity: tab === 'buy' ? 1 : 0.5 }}>Buy</span>
              </button>
              <button
                onClick={() => handleTabSwitch('sell')}
                className="flex-1 h-full rounded-[8px] flex items-center justify-center border-0 cursor-pointer"
                style={{ background: tab === 'sell' ? '#ed1717' : 'transparent' }}
              >
                <span className="text-[16px] leading-[26px]" style={{ color: tab === 'sell' ? 'white' : 'white', opacity: tab === 'sell' ? 1 : 0.5 }}>Sell</span>
              </button>
            </div>
          </div>

          {/* Pay Total card */}
          <div className="flex flex-col gap-3 mt-4 px-4 py-6 rounded-[8px]" style={{ background: '#333' }}>
            {/* Label + percents */}
            <div className="flex items-center justify-between">
              <span className="text-white text-[12px] font-medium">Pay Total</span>
              <div className="flex items-center gap-[7px]">
                {PERCENTS.map(p => (
                  <div key={p} onClick={() => handlePercent(p)} className="flex items-center justify-center px-2 py-1 rounded-[8px] cursor-pointer" style={{ background: '#555' }}>
                    <span className="text-white text-[12px] leading-[18px]">{p}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Amount + token */}
            <div className="flex items-center justify-between h-5">
              <input
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={e => {
                  const v = e.target.value
                  if (v === '' || /^\d*\.?\d*$/.test(v)) setAmount(v)
                }}
                className="bg-transparent border-0 outline-none text-white text-[16px] leading-[26px] p-0 m-0 w-[180px]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              />
              <div className="flex items-center gap-[6px] px-[6px] py-[2px] rounded-[8px]" style={{ background: '#555' }}>
                <img src={isSell ? ASSETS.tokenIcon : ASSETS.solIcon} alt="" className="w-5 h-5 rounded-full object-cover" />
                <span className="text-white text-[14px] leading-[21px]">{isSell ? 'QuantAgent' : 'SOL'}</span>
              </div>
            </div>
            {/* USD + wallet */}
            <div className="flex items-center justify-between h-5">
              <span className="text-[14px]" style={{ color: '#999' }}>${usdValue}</span>
              <div className="flex items-center gap-[6px]">
                <img src={ASSETS.walletIcon} alt="" className="w-4 h-4" />
                <span className="text-[14px]" style={{ color: '#999' }}>{isSell ? TOKEN_BALANCE.toLocaleString() : WALLET_BALANCE}</span>
                <span className="text-[14px]" style={{ color: '#999' }}>{isSell ? 'QuantAgent' : 'SOL'}</span>
              </div>
            </div>
          </div>

          {/* Receive Amount card */}
          <div className="flex flex-col gap-3 mt-2 px-4 py-6 rounded-[8px]" style={{ background: '#333' }}>
            <span className="text-white text-[12px] font-medium">Receive Amount</span>
            {/* Amount + token */}
            <div className="flex items-center justify-between h-5">
              <span className="text-white text-[16px] leading-[26px]">{receiveAmount}</span>
              <div className="flex items-center gap-[6px] px-[6px] py-[2px] rounded-[8px]" style={{ background: '#555' }}>
                <img src={isSell ? ASSETS.solIcon : ASSETS.tokenIcon} alt="" className="w-5 h-5 rounded-full object-cover" />
                <span className="text-white text-[14px] leading-[21px]">{isSell ? 'SOL' : 'QuantAgent'}</span>
              </div>
            </div>
            {/* USD */}
            <div className="flex items-center h-5">
              <span className="text-[14px]" style={{ color: '#999' }}>${usdValue}</span>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Bottom action button */}
          <div className="pb-[34px]">
            {!walletConnected ? (
              <button
                onClick={() => setWalletConnected(true)}
                className="w-full h-[58px] rounded-[16px] flex items-center justify-center cursor-pointer"
                style={{ background: '#052e16', border: '1px solid #15803d' }}
              >
                <span className="text-[16px] font-bold" style={{ color: '#4ade80', fontFamily: "'Montserrat', sans-serif" }}>Connect Wallet</span>
              </button>
            ) : insufficientBalance ? (
              <button
                className="w-full h-[58px] rounded-[16px] flex items-center justify-center"
                style={{ background: '#450a0a', border: '1px solid #991b1b', cursor: 'not-allowed' }}
              >
                <span className="text-[16px] font-bold" style={{ color: '#ed1717', fontFamily: "'Montserrat', sans-serif" }}>Insufficient Balance</span>
              </button>
            ) : approved ? (
              <button
                onClick={() => { setShowToast(true); setTimeout(() => setShowToast(false), 3000) }}
                className="w-full h-[58px] rounded-[16px] flex items-center justify-center cursor-pointer"
                style={{ background: 'white', border: 'none' }}
              >
                <span className="text-[16px] font-bold" style={{ color: '#111', fontFamily: "'Montserrat', sans-serif" }}>{isSell ? 'Approve QuantAgent' : 'Approve Sol'}</span>
              </button>
            ) : (
              <button
                onClick={() => setApproved(true)}
                className="w-full h-[58px] rounded-[16px] flex items-center justify-center cursor-pointer"
                style={{ background: isSell ? '#450a0a' : '#052e16', border: `1px solid ${isSell ? '#991b1b' : '#15803d'}` }}
              >
                <span className="text-[16px] font-bold" style={{ color: isSell ? '#ed1717' : '#4ade80', fontFamily: "'Montserrat', sans-serif" }}>{isSell ? 'Confirm Sell' : 'Confirm Trade'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
