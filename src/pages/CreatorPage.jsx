import { useState } from 'react'
import StatusBar from '../components/StatusBar'

// ─── Assets ────────────────────────────────────────────────────────
const ASSETS = {
  arrowBack: '/image/creatorpage_arrowback.png',
  share: '/image/creatorpage_share.png',
  favorite: '/image/creatorpage_favorite.png',
  avatar: '/image/creatorpage_avatar.png',
  verified: '/image/creatorpage_verified.png',
  github: '/image/creatorpage_github.png',
  x: '/image/creatorpage_x.png',
  copy: '/image/creatorpage_copy.png',
  searchIcon: '/image/creatorpage_searchicon.png',
  iconStar: '/image/creatorpage_iconstar.png',
  creatorAvatar: '/image/creatorpage_creatoravatar.png',
  // Card images
  card1: '/image/creatorpage_card1.png',
  card2: '/image/creatorpage_card2.png',
  card3: '/image/creatorpage_card3.png',
  card4: '/image/creatorpage_card4.png',
  card5: '/image/creatorpage_card5.png',
  card6: '/image/creatorpage_card6.png',
}

// ─── Mock Works Data ──────────────────────────────────────────────
const WORKS = [
  { id: 1, name: 'Pineapple Agent', price: 'Free', type: 'prompt', rating: 5, img: ASSETS.card1 },
  { id: 2, name: 'Quant Trader Agent', price: 'US$15.00', type: 'prompt', rating: 5, img: ASSETS.card2 },
  { id: 3, name: 'MechanicMate', price: 'Free', type: 'prompt', rating: 5, img: ASSETS.card3 },
  { id: 4, name: 'PeptAI', price: 'US$19.98', type: 'prompt', rating: 5, img: ASSETS.card4 },
  { id: 5, name: 'MechanicMate', price: 'US$20.00', type: 'prompt', rating: 5, img: ASSETS.card5 },
  { id: 6, name: 'Capital Network Agency', price: 'US$10.00', type: 'prompt', rating: 5, img: ASSETS.card6 },
  { id: 7, name: 'Data Scraper', price: 'Free', type: 'tool', rating: 4, img: ASSETS.card1 },
  { id: 8, name: 'Smart Analyzer', price: 'US$5.00', type: 'tool', rating: 4, img: ASSETS.card3 },
  { id: 9, name: 'Alpha Scout', price: 'US$25.00', type: 'agent', rating: 5, img: ASSETS.card2 },
  { id: 10, name: 'Trade Bot', price: 'US$30.00', type: 'agent', rating: 5, img: ASSETS.card4 },
  { id: 11, name: 'Token Launcher', price: 'US$12.00', type: 'tokenized', rating: 4, img: ASSETS.card5 },
  { id: 12, name: 'Yield Farm Agent', price: 'US$8.00', type: 'tokenized', rating: 5, img: ASSETS.card6 },
]

const CREATOR = {
  name: 'ilumdev',
  fullName: 'Aronas Leilionas Golovin',
}

// ─── Sub-components ───────────────────────────────────────────────
function WorkCard({ name, price, type, rating, img }) {
  return (
    <div className="flex flex-col w-[155px] shrink-0">
      {/* Image */}
      <div className="relative w-full h-[100px] rounded-t-[8px] overflow-hidden">
        <img src={img} alt={name} className="w-full h-full object-cover" />
        {/* Type badge */}
        <div
          className="absolute top-2 left-2 px-[6px] py-[2px] rounded-[1000px] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(22.5px)' }}
        >
          <span className="text-white text-[8px] font-bold capitalize leading-[1.4]">{type}</span>
        </div>
        {/* Star badge */}
        <div
          className="absolute top-2 right-2 flex items-center gap-[2px] px-[4px] py-[1px] rounded-[10px]"
          style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)' }}
        >
          <img src={ASSETS.iconStar} alt="" className="w-[9px] h-[9px]" />
          <span className="text-[#fed900] text-[9px] font-bold">{rating}</span>
        </div>
      </div>
      {/* Info */}
      <div className="flex flex-col gap-[6px] px-[11px] py-[12px] rounded-b-[8px] h-[96px]" style={{ background: '#111' }}>
        <div className="flex items-center gap-[6px]">
          <div className="relative w-4 h-4">
            <img src={ASSETS.creatorAvatar} alt="" className="w-full h-full rounded-full" />
            <span className="absolute inset-0 flex items-center justify-center text-white text-[8px] font-medium">I</span>
          </div>
          <span className="text-white text-[8px] font-medium">{CREATOR.name}</span>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#f5f8fa] text-[12px] font-semibold leading-[1.2] m-0 overflow-hidden text-ellipsis whitespace-nowrap">{name}</p>
          <p className="text-white text-[12px] m-0">{price}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────
export default function CreatorPage({ onBack }) {
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')

  const TABS = [
    { key: 'all', label: 'All', count: WORKS.length },
    { key: 'prompt', label: 'Prompts', count: WORKS.filter(w => w.type === 'prompt').length },
    { key: 'tool', label: 'Tools', count: WORKS.filter(w => w.type === 'tool').length },
    { key: 'agent', label: 'Agents', count: WORKS.filter(w => w.type === 'agent').length },
    { key: 'tokenized', label: 'Tokenized', count: WORKS.filter(w => w.type === 'tokenized').length },
  ]

  const filteredWorks = WORKS.filter(w => {
    const matchTab = activeTab === 'all' || w.type === activeTab
    const matchSearch = !search || w.name.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <StatusBar />

      {/* Top nav */}
      <div className="shrink-0 flex items-center justify-between px-6 pt-4 pb-2">
        <button onClick={onBack} className="bg-transparent border-0 cursor-pointer p-0">
          <img src={ASSETS.arrowBack} alt="Back" className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <button className="bg-transparent border-0 cursor-pointer p-0">
            <img src={ASSETS.share} alt="Share" className="w-6 h-6" />
          </button>
          <button className="bg-transparent border-0 cursor-pointer p-0">
            <img src={ASSETS.favorite} alt="Favorite" className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scroll-hide px-6 pb-6">
        <div className="flex flex-col gap-10">

          {/* Creator profile */}
          <div className="flex items-center gap-[15px] mt-4">
            <div className="relative w-[88px] h-[88px] shrink-0">
              <img src={ASSETS.avatar} alt="" className="w-full h-full rounded-full object-cover" />
              <div className="absolute bottom-0 right-0 w-5 h-5">
                <img src={ASSETS.verified} alt="" className="w-full h-full" />
              </div>
            </div>
            <div className="flex flex-col gap-[10px]" style={{ width: 229 }}>
              <div className="flex flex-col gap-[2px]">
                <span className="text-white text-[18px] leading-[29px]">{CREATOR.name}</span>
                <span className="text-[10px] leading-[14px]" style={{ color: '#999' }}>{CREATOR.fullName}</span>
              </div>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-[10px]">
                  <img src={ASSETS.github} alt="" className="w-4 h-4" />
                  <img src={ASSETS.x} alt="" className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1 cursor-pointer">
                  <img src={ASSETS.copy} alt="" className="w-4 h-4" />
                  <span className="text-white text-[12px] leading-[18px]">Copy URL</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div
            className="flex items-center h-[56px] rounded-[10px] pl-6 pr-3 gap-4"
            style={{ background: '#111' }}
          >
            <img src={ASSETS.searchIcon} alt="" className="w-6 h-6 shrink-0" />
            <input
              type="text"
              placeholder="Search works..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent border-0 outline-none text-white text-[16px] font-medium flex-1 p-0"
              style={{ fontFamily: "'Montserrat', sans-serif", opacity: search ? 1 : 0.5 }}
            />
          </div>

          {/* Scrollable tabs */}
          <div className="flex items-start gap-5 overflow-x-auto scroll-hide -mt-4">
            {TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className="bg-transparent border-0 cursor-pointer p-0 flex flex-col items-center gap-[3px] shrink-0"
              >
                <span
                  className="text-[12px] leading-[18px] whitespace-nowrap"
                  style={{ color: 'white', opacity: activeTab === t.key ? 1 : 0.5 }}
                >
                  {t.label} ({t.count})
                </span>
                {activeTab === t.key && (
                  <div className="w-5 h-[2px] rounded-[1px]" style={{ background: 'white' }} />
                )}
              </button>
            ))}
          </div>

          {/* Works grid */}
          <div className="flex flex-wrap gap-[17px]">
            {filteredWorks.map(w => (
              <WorkCard key={w.id} {...w} />
            ))}
          </div>

        </div>
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute left-0 right-0 bottom-0 pointer-events-none"
        style={{ height: 121, background: 'linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, black 77.6%)' }}
      />
    </div>
  )
}
