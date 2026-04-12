import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import SearchBar from '../components/SearchBar'

// ─── Assets ────────────────────────────────────────────────────────
// Note: Figma MCP URLs expire in 7 days — download to /public/image/ as .webp
const ASSETS = {
  iconStar:    '/image/homepage_iconstar.png',
  // Category tab icons (from node 11029:2375)
  tabForYou:   '/image/homepage_tabforyou.png',
  tabPrompts:  '/image/homepage_tabprompts.png',
  tabAgents:   '/image/homepage_tabagents.png',
  tabTools:    '/image/homepage_tabtools.png',
  // Agent card images
  card1:  '/image/homepage_card1.png',
  card2:  '/image/homepage_card2.png',
  card3:  '/image/homepage_card3.png',
  card4:  '/image/homepage_card4.png',
  card5:  '/image/homepage_card5.png',
  card6:  '/image/homepage_card6.png',
  card7:  '/image/homepage_card7.png',
  card8:  '/image/homepage_card8.png',
  card9:  '/image/homepage_card9.png',
  card10: '/image/homepage_card10.png',
}

// ─── Constants ─────────────────────────────────────────────────────
const TABS = [
  { key: 'foryou',   label: 'For You',  icon: ASSETS.tabForYou  },
  { key: 'prompts',  label: 'Prompts',  icon: ASSETS.tabPrompts },
  { key: 'agents',   label: 'Agents',   icon: ASSETS.tabAgents  },
  { key: 'tools',    label: 'Tools',    icon: ASSETS.tabTools   },
]

const ALL_AGENTS = [
  { img: ASSETS.card1,  tag: 'Prompt', stars: 5, author: 'Playeds',       authorInitial: 'P', title: 'Apple Agent',        price: 'US$25.00', category: 'prompts'  },
  { img: ASSETS.card2,  tag: 'Agent',  stars: 5, author: 'Euroswarms',     authorInitial: 'E', title: 'LiveFetch',          price: 'US$35.00', category: 'agents'   },
  { img: ASSETS.card3,  tag: 'Agent',  stars: 5, author: 'QuantAgentDev',  authorInitial: 'Q', title: 'Quant Trader Agent', price: 'US$15.00', category: 'agents'   },
  { img: ASSETS.card4,  tag: 'Prompt', stars: 5, author: 'Jason',          authorInitial: 'J', title: 'Agent Maxwell',      price: 'US$35.00', category: 'prompts'  },
  { img: ASSETS.card5,  tag: 'Agent',  stars: 5, author: 'LISA',           authorInitial: 'L', title: 'Doctor Lisa',        price: 'US$25.00', category: 'agents'   },
  { img: ASSETS.card6,  tag: 'Agent',  stars: 5, author: 'Playeds',        authorInitial: 'P', title: 'XRAY-GPT',           price: 'US$35.00', category: 'agents'   },
  { img: ASSETS.card7,  tag: 'Prompt', stars: 5, author: 'Agent',          authorInitial: 'A', title: 'SwarmOrchestra',     price: 'US$25.00', category: 'prompts'  },
  { img: ASSETS.card8,  tag: 'Agent',  stars: 5, author: 'Jaenan',         authorInitial: 'J', title: 'Nurse Ellie',        price: 'US$35.00', category: 'agents'   },
  { img: ASSETS.card9,  tag: 'Agent',  stars: 5, author: 'MAX',            authorInitial: 'P', title: 'SwarmBag',           price: 'US$25.00', category: 'agents'   },
  { img: ASSETS.card10, tag: 'Agent',  stars: 5, author: 'inverse',        authorInitial: 'I', title: 'LaunchForge',        price: 'US$35.00', category: 'agents'   },
]

// ─── Sub-components ────────────────────────────────────────────────

function CategoryTabs({ active, onChange }) {
  return (
    <div className="flex items-center gap-3 px-4 sm:px-6 overflow-x-auto scroll-hide">
      {TABS.map(({ key, label, icon }) => {
        const isActive = active === key
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className="shrink-0 cursor-pointer"
            style={{
              display: 'flex',
              padding: '8px 10px',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '4px',
              borderRadius: '6px',
              background: isActive ? '#fff' : 'transparent',
              border: isActive ? 'none' : '1px solid #333',
              outline: 'none',
            }}
          >
            <div className="w-4 h-4 shrink-0 flex items-center justify-center">
              <img
                src={icon}
                alt=""
                className="w-full h-full object-contain"
                style={{
                  filter: isActive
                    ? 'brightness(0)'
                    : 'brightness(0) invert(1) opacity(0.6)'
                }}
              />
            </div>
            <span
              className="text-sm font-medium leading-[22px] whitespace-nowrap"
              style={{ color: isActive ? '#111' : '#999' }}
            >
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function StarRating({ stars }) {
  return (
    <div className="flex items-center gap-[2px] bg-black/40 backdrop-blur-sm rounded-full px-[5px] py-[2px]">
      <span className="text-[#fed900] text-[8.7px] font-bold leading-none">{stars}</span>
      <img src={ASSETS.iconStar} alt="★" className="w-[9px] h-[9px]" />
    </div>
  )
}

function AgentCard({ img, tag, stars, author, authorInitial, title, price, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col rounded-[10px] overflow-hidden w-full cursor-pointer min-w-0"
    >
      {/* Image — 约 100/155 ≈ 10/15.5 比例 */}
      <div className="relative w-full" style={{ paddingBottom: '64.5%' }}>
        <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        {/* Tag */}
        <div className="absolute top-[8px] left-[8px] bg-black/40 backdrop-blur-sm rounded-full px-[6px] py-[2px]">
          <span className="text-white text-[8px] font-bold capitalize">{tag}</span>
        </div>
        {/* Stars */}
        <div className="absolute top-[8px] right-[8px]">
          <StarRating stars={stars} />
        </div>
      </div>
      {/* Info */}
      <div className="bg-[#0d0d0d] px-[11px] py-[12px] flex flex-col gap-[6px] h-[96px]">
        {/* Author */}
        <div className="flex items-center gap-[6px]">
          <div className="w-4 h-4 rounded-[8px] bg-[#1a1a1b] border border-white/10 flex items-center justify-center shrink-0">
            <span className="text-white text-[8px] font-medium">{authorInitial}</span>
          </div>
          <span className="text-white text-[8px] font-medium truncate">{author}</span>
        </div>
        {/* Title & price */}
        <div className="flex flex-col gap-2">
          <p className="text-[#f5f8fa] text-[12px] font-semibold leading-[1.2] truncate m-0">{title}</p>
          <p className="text-white text-[12px] font-normal m-0">{price}</p>
        </div>
      </div>
    </div>
  )
}

function AgentGrid({ agents, onAgentClick }) {
  return (
    <div className="px-4 sm:px-6 grid grid-cols-2 gap-[14px] sm:gap-[17px]">
      {agents.map((agent, i) => (
        <AgentCard key={i} {...agent} onClick={onAgentClick} />
      ))}
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────
export default function HomePage({ onFilter, onSearch, onAgentClick, onChat, onProfile, onLaunch, onTrending, onSettings }) {
  const [activeTab, setActiveTab] = useState('foryou')

  const visibleAgents = activeTab === 'foryou'
    ? ALL_AGENTS
    : ALL_AGENTS.filter(a => a.category === activeTab)

  return (
    <div className="flex flex-col h-full bg-black" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <StatusBar />

      {/* 固定区域：搜索栏 + TagBar */}
      <div className="shrink-0 flex flex-col gap-3 pt-3">
        <SearchBar onFilter={onFilter} onTap={onSearch} />
        <CategoryTabs active={activeTab} onChange={setActiveTab} />
      </div>

      {/* 可滚动区域：Agent 卡片列表 */}
      <div className="flex-1 overflow-y-auto scroll-hide pt-4 pb-2">
        <AgentGrid agents={visibleAgents} onAgentClick={onAgentClick} />
      </div>

      <BottomNav
        activeTab="home"
        onChat={onChat}
        onProfile={onProfile}
        onLaunch={onLaunch}
        onTrending={onTrending}
        onSettings={onSettings}
      />
    </div>
  )
}
