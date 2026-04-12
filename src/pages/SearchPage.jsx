import StatusBar from '../components/StatusBar'
import SearchBar from '../components/SearchBar'

// ─── Assets ────────────────────────────────────────────────────────
const ASSETS = {
  arrowBack:  '/image/searchpage_arrowback.svg',
  checkIcon:  '/image/searchpage_checkicon.svg',
  checkBg:    '/image/searchpage_checkbg.svg',
  // Recent avatars
  recent1: '/image/searchpage_recent1.png',
  recent2: '/image/searchpage_recent2.png',
  recent3: '/image/searchpage_recent3.png',
  // Top Agents avatars
  agent1: '/image/searchpage_agent1.png',
  agent2: '/image/searchpage_agent2.png',
  agent3: '/image/searchpage_agent3.png',
  // Prompt avatars
  prompt1: '/image/searchpage_prompt1.png',
  prompt2: '/image/searchpage_prompt2.png',
  prompt3: '/image/searchpage_prompt3.png',
  // Tools avatars
  tools1: '/image/searchpage_tools1.png',
  tools2: '/image/searchpage_tools2.png',
  tools3: '/image/searchpage_tools3.png',
}

// ─── Constants ─────────────────────────────────────────────────────
const RECENT = [
  { img: ASSETS.recent1, name: 'Quant Trader Agent' },
  { img: ASSETS.recent2, name: 'CR-CA Agent' },
  { img: ASSETS.recent3, name: 'CR-CA Agent' },
]

const TOP_AGENTS = [
  { img: ASSETS.agent1, name: 'ClawdCorp',          desc: 'ClawdCorp AVA',       score: '99.5%' },
  { img: ASSETS.agent2, name: 'Quant Trader Agent',  desc: 'Quant Trader Agent',  score: '93.5%' },
  { img: ASSETS.agent3, name: 'LUAF',                desc: 'LUAF',                score: '91.5%' },
]

const PROMPTS = [
  { img: ASSETS.prompt1, name: 'Whale Intel',  desc: 'Stop getting dumped on by whales.', score: '89.5%' },
  { img: ASSETS.prompt2, name: 'YouTube',       desc: 'YouTube',                            score: '89.5%' },
  { img: ASSETS.prompt3, name: 'Free Prizes',   desc: 'Free Prizes',                        score: '89.5%' },
]

const TOOLS = [
  { img: ASSETS.tools1, name: 'fwafwafwa',             desc: 'none',                                                                                          score: '81.5%' },
  { img: ASSETS.tools2, name: 'Swarms Launchpad API',  desc: 'Client for the Swarms Launchpad API that creates and launches new tokens on the Swarms platform', score: '78.5%' },
  { img: ASSETS.tools3, name: 'Claude Code As A Tool', desc: 'Claude Code Agent Tool - Setup Guide',                                                           score: '79.3%' },
]

const USERS = [
  { initial: 'F', name: 'FrUItswarms' },
  { initial: 'R', name: 'Rainbowkode' },
  { initial: 'S', name: 'Sean' },
  { initial: 'B', name: 'Bitbot' },
]

// ─── Sub-components ────────────────────────────────────────────────
function ReliabilityBadge({ score }) {
  return (
    <div className="inline-flex flex-col items-start" style={{ background: '#052e16', borderRadius: '4px', padding: '4px', gap: '10px' }}>
      <div className="flex items-center gap-[6px]">
        <div className="relative w-[14px] h-[14px]">
          <img src={ASSETS.checkIcon} alt="" className="absolute inset-0 w-full h-full" />
          <img src={ASSETS.checkBg} alt="" className="absolute inset-0 w-full h-full" />
        </div>
        <span className="text-white text-[12px] font-normal leading-[18px]">{score}</span>
      </div>
    </div>
  )
}

function AgentListCard({ img, name, desc, score }) {
  return (
    <div
      className="w-full rounded-[8px] flex flex-col cursor-pointer"
      style={{ border: '1px solid #333', padding: '16px 10px 16px 16px' }}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <img src={img} alt={name} className="w-6 h-6 rounded-full object-cover" />
          <span className="text-white text-[14px] font-normal leading-[21px]">{name}</span>
        </div>
        <p className="text-white text-[12px] font-normal leading-[18px] m-0">{desc}</p>
      </div>
      <div className="mt-4">
        <ReliabilityBadge score={score} />
      </div>
    </div>
  )
}

function UserRow({ initial, name }) {
  return (
    <div
      className="w-full rounded-[8px] flex items-center gap-2 cursor-pointer"
      style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '16px 10px 16px 16px' }}
    >
      <div
        className="w-6 h-6 rounded-[12px] flex items-center justify-center shrink-0 text-white text-[12px] font-medium"
        style={{ background: '#0a0a0a', border: '1px solid #333', letterSpacing: '-0.36px' }}
      >
        {initial}
      </div>
      <span className="text-white text-[14px] font-medium leading-[1.2]">{name}</span>
    </div>
  )
}

function SectionTitle({ title, size = 18 }) {
  return (
    <h2
      className="text-white font-bold leading-[26px] m-0"
      style={{ fontSize: `${size}px` }}
    >
      {title}
    </h2>
  )
}

// ─── Page ──────────────────────────────────────────────────────────
export default function SearchPage({ onBack }) {
  return (
    <div className="flex flex-col h-full bg-black" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <StatusBar />

      {/* Top bar: back arrow + SearchBar (no filter button) */}
      <div className="shrink-0 flex items-center gap-1">
        <button onClick={onBack} className="bg-transparent border-0 cursor-pointer p-0 shrink-0 ml-6">
          <img src={ASSETS.arrowBack} alt="Back" className="w-6 h-6" />
        </button>
        <div className="flex-1 min-w-0 -ml-2">
          <SearchBar onSearch={() => {}} autoFocus showFilter={false} />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scroll-hide px-6 flex flex-col gap-6 pt-3 pb-6">

        {/* Recent */}
        <div className="flex flex-col gap-[10px]">
          <SectionTitle title="Recent" />
          <div className="flex items-center gap-2 overflow-x-auto scroll-hide">
            {RECENT.map((item, i) => (
              <div key={i} className="flex items-center gap-[10px] px-[10px] py-2 rounded-[8px] shrink-0" style={{ background: '#111' }}>
                <img src={item.img} alt="" className="w-[26px] h-[26px] rounded-full object-cover" />
                <span className="text-white text-[12px] font-normal">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Agents */}
        <div className="flex flex-col gap-[10px]">
          <SectionTitle title="Top Agents" />
          <div className="flex flex-col gap-2">
            {TOP_AGENTS.map((a, i) => <AgentListCard key={i} {...a} />)}
          </div>
        </div>

        {/* Prompt */}
        <div className="flex flex-col gap-[10px]">
          <SectionTitle title="Prompt" />
          <div className="flex flex-col gap-2">
            {PROMPTS.map((a, i) => <AgentListCard key={i} {...a} />)}
          </div>
        </div>

        {/* Tools */}
        <div className="flex flex-col gap-[10px]">
          <SectionTitle title="Tools" />
          <div className="flex flex-col gap-2">
            {TOOLS.map((a, i) => <AgentListCard key={i} {...a} />)}
          </div>
        </div>

        {/* Users */}
        <div className="flex flex-col gap-[10px]">
          <SectionTitle title="Users" size={16} />
          <div className="flex flex-col gap-2">
            {USERS.map((u, i) => <UserRow key={i} {...u} />)}
          </div>
        </div>

      </div>
    </div>
  )
}
