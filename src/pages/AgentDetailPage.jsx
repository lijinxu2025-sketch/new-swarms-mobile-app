import { useState } from 'react'
import StatusBar from '../components/StatusBar'

// ─── Assets ────────────────────────────────────────────────────────
const ASSETS = {
  heroBg:      '/image/agentdetailpage_herobg.png',
  arrowBack:   '/image/agentdetailpage_arrowback.svg',
  cart:        '/image/agentdetailpage_cart.svg',
  share:       '/image/agentdetailpage_share.svg',
  avatar:      '/image/agentdetailpage_avatar.svg',
  chevron:     '/image/agentdetailpage_chevron.svg',
  chevronDown: '/image/agentdetailpage_chevrondown.svg',
  copy:        '/image/agentdetailpage_copy.svg',
  download:    '/image/agentdetailpage_download.svg',
  aiIcon:      '/image/agentdetailpage_aiicon.svg',
  aiGenIcon:   '/image/agentdetailpage_aigenicon.svg',
  genImg1:     '/image/agentdetailpage_genimg1.png',
  genImg2:     '/image/agentdetailpage_genimg1.png',
  recCard1:    '/image/agentdetailpage_reccard1.png',
  recCard2:    '/image/agentdetailpage_reccard2.png',
  iconStar:    '/image/agentdetailpage_iconstar.svg',
  bottomBg:    '/image/agentdetailpage_bottombg.png',
}

// ─── Sub-components ────────────────────────────────────────────────

function Section({ title, children, defaultOpen = false, chevronRight = false, onPress }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="w-full px-6 py-4" style={{ background: '#111' }}>
      <button
        onClick={() => {
          if (onPress) return onPress()
          if (!chevronRight) setOpen(!open)
        }}
        className="flex items-center justify-between w-full bg-transparent border-0 cursor-pointer p-0"
      >
        <h3 className="text-white text-[18px] font-bold leading-[26px] m-0">{title}</h3>
        <img
          src={ASSETS.chevron}
          alt=""
          className="w-6 h-6"
          style={{
            transform: chevronRight ? 'none' : open ? 'rotate(-90deg)' : 'rotate(90deg)',
            transition: 'transform 0.2s',
          }}
        />
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  )
}

function MetadataRow({ label, value, green }) {
  return (
    <div className="flex items-center justify-between py-[2px]">
      <span className="text-white text-[12px]">{label}</span>
      <span className={`text-[12px] ${green ? 'text-[#4ade80]' : 'text-white'}`}>{value}</span>
    </div>
  )
}

function CopyableRow({ label, value }) {
  return (
    <div className="flex flex-col gap-[6px]">
      <div className="flex items-center justify-between">
        <span className="text-white text-[12px]">{label}</span>
        <button className="w-6 h-6 rounded-[4px] flex items-center justify-center p-[5px] border-0 cursor-pointer" style={{ background: '#1f1f1f' }}>
          <img src={ASSETS.copy} alt="Copy" className="w-[14px] h-[14px]" />
        </button>
      </div>
      <p className="text-white text-[12px] m-0 break-all">{value}</p>
    </div>
  )
}

function SmallCard({ img, tag, author, authorInitial, title, price }) {
  return (
    <div className="flex flex-col rounded-[10px] overflow-hidden shrink-0 w-[155px]">
      <div className="relative h-[100px]">
        <img src={img} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-sm rounded-full px-[6px] py-[2px]">
          <span className="text-white text-[8px] font-bold capitalize">{tag}</span>
        </div>
        <div className="absolute top-2 right-2 flex items-center gap-[2px] bg-black/40 backdrop-blur-sm rounded-full px-[5px] py-[2px]">
          <span className="text-[#fed900] text-[8.7px] font-bold">5</span>
          <img src={ASSETS.iconStar} alt="" className="w-[9px] h-[9px]" />
        </div>
      </div>
      <div className="px-[11px] py-3 flex flex-col gap-[6px] h-[96px]" style={{ background: '#1f1f1f' }}>
        <div className="flex items-center gap-[6px]">
          <div className="w-4 h-4 rounded-[8px] flex items-center justify-center shrink-0 text-white text-[8px] font-medium" style={{ background: '#1f1f1f', border: '0.5px solid rgba(255,255,255,0.1)' }}>
            {authorInitial}
          </div>
          <span className="text-white text-[8px] font-medium">{author}</span>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#f5f8fa] text-[12px] font-semibold leading-[1.2] truncate m-0">{title}</p>
          <p className="text-white text-[12px] m-0">{price}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────
export default function AgentDetailPage({ onBack, onReviews, onTrade, onCreator }) {
  const [promptTab, setPromptTab] = useState('Preview')
  const [promptOpen, setPromptOpen] = useState(false)
  const PROMPT_TABS = ['Preview', 'Markdown', 'Text', 'Framework', 'Api']

  return (
    <div className="flex flex-col h-full" style={{ background: '#0a0a0a', fontFamily: "'Montserrat', sans-serif" }}>
      <StatusBar />

      {/* Top nav */}
      <div className="shrink-0 flex items-center justify-between px-6 py-3 relative z-10">
        <button onClick={onBack} className="bg-transparent border-0 cursor-pointer p-0">
          <img src={ASSETS.arrowBack} alt="Back" className="w-6 h-6" />
        </button>
        <span className="text-white text-[18px] font-bold leading-[27px]">Detail product</span>
        <div className="flex items-center gap-2">
          <img src={ASSETS.cart} alt="Cart" className="w-6 h-6 cursor-pointer" />
          <img src={ASSETS.share} alt="Share" className="w-6 h-6 cursor-pointer" />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scroll-hide pb-[90px]">

        {/* Hero image */}
        <div className="w-full" style={{ height: '258px' }}>
          <img src={ASSETS.heroBg} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col gap-2">

          {/* Product info */}
          <div className="w-full px-6 py-4" style={{ background: '#111' }}>
            <div className="flex flex-col gap-5">
              {/* Name & price */}
              <div className="flex flex-col gap-2">
                <h1 className="text-white text-[24px] font-bold leading-[33px] m-0">Quant Trader Agent</h1>
                <div className="flex items-center gap-[6px]">
                  <div className="px-2 py-[6px] rounded-[6px] flex items-center justify-center" style={{ background: '#1f1f1f' }}>
                    <span className="text-white text-[10px] font-bold">US$15.00</span>
                  </div>
                  <span className="text-white text-[12px]">(200 people used this)</span>
                </div>
              </div>

              {/* Author + Follow */}
              <div className="flex items-center justify-between py-2" style={{ borderTop: '1px solid #333', borderBottom: '1px solid #333' }}>
                <div className="flex items-center gap-[17px]">
                  <div className="relative w-[46px] h-[46px]">
                    <img src={ASSETS.avatar} alt="" className="w-full h-full rounded-full" />
                    <span className="absolute inset-0 flex items-center justify-center text-white text-[16px] font-bold">Q</span>
                  </div>
                  <span onClick={onCreator} className="text-white text-[13px] font-semibold cursor-pointer">QuantAgentDev</span>
                </div>
                <button className="w-[100px] h-[35px] rounded-[8px] flex items-center justify-center cursor-pointer bg-transparent text-white text-[14px]" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                  Follow
                </button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="w-full px-6 py-4" style={{ background: '#111' }}>
            <h3 className="text-white text-[18px] font-bold leading-[26px] m-0 mb-4">Description of product</h3>
            <p className="text-white text-[12px] leading-[18px] m-0">
              Quant Trader Agent is an elite quantitative analyst specializing in comprehensive financial analysis across all asset classes and market conditions. It synthesizes technical indicators, fundamental valuations, market sentiment, and macroeconomic trends into actionable intelligence with precise price targets and risk parameters.
              <br /><br />
              Primary Use Cases: Evaluating individual stocks and securities with multi-dimensional analysis, identifying intermediate price targets grounded in technical and ...
            </p>
          </div>

          {/* Main Prompt */}
          <div className="w-full px-6 py-4" style={{ background: '#111' }}>
            <div className="flex flex-col gap-5">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setPromptOpen(!promptOpen)}
              >
                <h3 className="text-white text-[18px] font-bold leading-[26px] m-0">Main Prompt</h3>
                <img
                  src={ASSETS.chevron}
                  alt=""
                  className="w-6 h-6"
                  style={{ transform: promptOpen ? 'rotate(-90deg)' : 'rotate(90deg)', transition: 'transform 0.2s' }}
                />
              </div>

              {promptOpen && (
                <>
                  {/* Tabs */}
                  <div className="flex items-center gap-5">
                    {PROMPT_TABS.map(tab => (
                      <button
                        key={tab}
                        onClick={() => setPromptTab(tab)}
                        className="bg-transparent border-0 cursor-pointer p-0 flex flex-col items-center"
                      >
                        <span className="text-white text-[12px] leading-[18px]">{tab}</span>
                        {promptTab === tab && (
                          <div className="mt-[3px] rounded-full" style={{ height: '2px', width: '100%', background: 'white' }} />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Tab content */}
                  <div className="text-white text-[12px] leading-[18px] m-0 overflow-hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {promptTab === 'Preview' && (
                      <div className="flex flex-col gap-2">
                        <p className="m-0">Quant Trader Agent is an elite quantitative analyst specializing in comprehensive financial analysis across all asset classes and market conditions.</p>
                        <p className="m-0">It synthesizes technical indicators, fundamental valuations, market sentiment, and macroeconomic trends into actionable intelligence with precise price targets and risk parameters.</p>
                      </div>
                    )}

                    {promptTab === 'Markdown' && (
                      <div className="flex flex-col gap-2">
                        <p className="m-0">name: swarms-marketplace-api description: Comprehensive reference for the Swarms Marketplace APIs. Use when creating/editing/querying agents or prompts, tokenizing agents (single or batch), claiming fees, or integrating with swarms.world. Covers CRUD for agents and prompts, token launch, batch token launch, schemas, examples, and error handling.</p>
                        <p className="m-0 font-bold">Swarms Marketplace API – Skill Reference</p>
                        <p className="m-0">Use this skill when working with the Swarms Marketplace: agents, prompts, tokenization (single and batch), and fee claims. All endpoints are under the marketplace base URL; authentication uses an API key or Supabase session.</p>
                        <p className="m-0">Full documentation (for deeper detail):</p>
                        <ul className="m-0 pl-5 flex flex-col gap-1">
                          <li>Overview & endpoint index: <span className="underline">https://docs.swarms.ai/docs/marketplace/api-overview</span></li>
                          <li>Agents API: <span className="underline">https://docs.swarms.ai/docs/marketplace/agents-api</span></li>
                          <li>Prompts API: <span className="underline">https://docs.swarms.ai/docs/marketplace/prompts-api</span></li>
                          <li>Token Launch (single): <span className="underline">https://docs.swarms.ai/docs/marketplace/token-launch-api</span></li>
                          <li>Token Launch Batch: <span className="underline">https://docs.swarms.ai/docs/marketplace/token-launch-batch-api</span></li>
                          <li>Tokenization details (costs, bonding curve): <span className="underline">https://docs.swarms.ai/docs/marketplace/tokenization_details</span></li>
                          <li>Claim Fees API: <span className="underline">https://docs.swarms.ai/docs/marketplace/claim-fees-api</span></li>
                          <li>Marketplace examples: <span className="underline">https://docs.swarms.ai/docs/marketplace/examples</span></li>
                          <li>API Reference (auth, limits): <span className="underline">https://docs.swarms.ai/api-reference</span></li>
                        </ul>
                        <p className="m-0">Base URLs & authentication</p>
                      </div>
                    )}

                    {promptTab === 'Text' && (
                      <pre className="m-0 whitespace-pre-wrap" style={{ fontFamily: "'Montserrat', sans-serif" }}>
{`---
name: swarms-marketplace-api
description: Comprehensive reference for the Swarms Marketplace APIs. Use when creating/editing/querying agents or prompts, tokenizing agents (single or batch), claiming fees, or integrating with swarms.world. Covers CRUD for agents and prompts, token launch, batch token launch, schemas, examples, and error handling.
---

Swarms Marketplace API – Skill Reference

Use this skill when working with the Swarms Marketplace: agents, prompts, tokenization (single and batch), and fee claims. All endpoints are under the marketplace base URL; authentication uses an API key or Supabase session.


`}
                      </pre>
                    )}

                    {promptTab === 'Framework' && (
                      <pre className="m-0 whitespace-pre-wrap" style={{ fontFamily: "'Montserrat', sans-serif" }}>
{`from swarms import Agent

agent = Agent(
    model_name="gpt-4.1",
    marketplace_prompt_id="458c01f1-76bc-4f9c-a6af-7992c71e1af8",
    max_loops=1,
)

response = agent.run("Hello, what can you help me with?")
print(response)`}
                      </pre>
                    )}

                    {promptTab === 'Api' && (
                      <pre className="m-0 whitespace-pre-wrap text-[11px] leading-[20px]" style={{ fontFamily: "'Courier New', monospace", color: '#e5e7eb' }}>
{`import os
import requests
from dotenv import load_dotenv

# Load API key from environment
load_dotenv()
API_KEY = os.getenv("SWARMS_API_KEY")
BASE_URL = "https://api.swarms.world"

# Configure headers with your API key
headers = {
    "x-api-key": API_KEY,
    "Content-Type": "application/json"
}

def run_single_agent(agent_config, task):
    """
    Run a single agent with the AgentCompletion format.
    """
    payload = {
        "agent_config": agent_config,
        "task": task
    }

    try:
        response = requests.post(
            f"{BASE_URL}/v1/agent/completions",
            headers=headers,
            json=payload
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error making request: {e}")
        return None`}
                      </pre>
                    )}
                  </div>

                  {/* Copy / Download actions */}
                  <div className="flex items-center gap-1">
                    <button className="w-6 h-6 rounded-[4px] flex items-center justify-center p-[5px] border-0 cursor-pointer" style={{ background: '#1f1f1f' }}>
                      <img src={ASSETS.copy} alt="Copy" className="w-[14px] h-[14px]" />
                    </button>
                    <button className="w-6 h-6 rounded-[4px] flex items-center justify-center p-[5px] border-0 cursor-pointer" style={{ background: '#1f1f1f' }}>
                      <img src={ASSETS.download} alt="Download" className="w-[14px] h-[14px]" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Chat — collapsed */}
          <Section title="Chat" chevronRight />

          {/* Images */}
          <Section title="Images">
            <div className="flex flex-col gap-4">
              {/* AI Generated Images row */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[8px] flex items-center justify-center shrink-0" style={{ background: 'rgba(147,51,234,0.3)' }}>
                  <img src={ASSETS.aiIcon} alt="" className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-[14px] font-bold leading-[14px]">AI Generated Images</span>
                  <span className="text-white/50 text-[10px] leading-[20px]">Generate and manage product images using AI</span>
                </div>
              </div>

              {/* Generate button */}
              <div className="flex justify-end">
                <button className="flex items-center gap-2 px-4 py-2 rounded-[6px] border-0 cursor-pointer" style={{ background: '#9333ea' }}>
                  <img src={ASSETS.aiGenIcon} alt="" className="w-4 h-4" />
                  <span className="text-white text-[12px]">Generate Images</span>
                </button>
              </div>

              {/* Note */}
              <div className="flex justify-center -mx-[14px]">
                <div className="rounded-[8px] p-[10px]" style={{ border: '1px solid #333' }}>
                  <p className="text-white text-[10px] leading-[20px] m-0">Note: Each generation creates 2 unique images. All generated images are public and visible to everyone.</p>
                </div>
              </div>

              {/* Generated image cards */}
              <div className="flex gap-[17px]">
                {[ASSETS.genImg1, ASSETS.genImg2].map((img, i) => (
                  <div key={i} className="flex flex-col w-[155px] shrink-0">
                    <div className="h-[100px]"><img src={img} alt="" className="w-full h-full object-cover" /></div>
                    <div className="px-[11px] py-3 flex flex-col gap-[6px] h-[96px] rounded-b-[10px]" style={{ background: '#1f1f1f' }}>
                      <span className="text-white text-[8px] capitalize">Generated 2026/1/3</span>
                      <p className="text-white text-[8px] font-medium leading-[1.2] m-0 overflow-hidden line-clamp-4">
                        Create a dynamic and vibrant promotional banner for the Quant Trader Agent, featuring a futuristic city…
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* Metadata */}
          <Section title="Metadata">
            <div className="flex flex-col gap-[10px]">
              <CopyableRow label="Prompt ID" value="6d165e47-1827-4abe-9a84-b25005d8e3b4" />
              <MetadataRow label="Author" value="QuantAgentDev" />
              <MetadataRow label="Name" value="Quant Trader Agent" />
              <MetadataRow label="Prompt Length" value="8,561 characters" />
              <MetadataRow label="Description Length" value="816 characters" />
              <MetadataRow label="Tags" value="2 tags" />
              <MetadataRow label="Links" value="1 link" />
              <MetadataRow label="Business Model" value="Tokenized" green />
            </div>
          </Section>

          {/* Tokenization Details */}
          <Section title="Tokenization Details">
            <div className="flex flex-col gap-[10px]">
              <CopyableRow label="Contract Address" value="GovbZFQxSk8rGy5S5L54uSWmrGaUJngEypSUDfwswrm" />
              <MetadataRow label="Total Supply" value="1,000,000,00" />
              <MetadataRow label="24h Volume (USD)" value="US$588" />
              <MetadataRow label="LP Liquidity (USD)" value="US$12,227" />
              <MetadataRow label="Ticker Symbol" value="QUANTAGENT" />
              <CopyableRow label="Pool Address" value="3TKV9xXhigwbDUDG4dL4S8L9PHiDFMf3yBXvWrG" />
            </div>
          </Section>

          {/* Reviews */}
          <Section title="Reviews" chevronRight onPress={onReviews} />

          {/* Items You'd Like */}
          <div className="w-full px-6 py-4" style={{ background: '#111' }}>
            <div className="flex flex-col gap-[10px]">
              <div className="flex items-center justify-between">
                <h3 className="text-white text-[18px] font-bold leading-[26px] m-0">Items You'd Like</h3>
                <img src={ASSETS.chevron} alt="" className="w-6 h-6" />
              </div>
              <div className="flex gap-[17px]">
                <SmallCard img={ASSETS.recCard1} tag="Prompt" author="Playeds" authorInitial="P" title="Apple Agent" price="US$25.00" />
                <SmallCard img={ASSETS.recCard2} tag="Agent" author="Euroswarms" authorInitial="E" title="LiveFetch" price="US$35.00" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom trade bar */}
      <div className="shrink-0 relative" style={{ height: '83px' }}>
        <div className="absolute inset-0" style={{ borderTop: '1px solid #333' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-[#111]/70 backdrop-blur-md" />
        </div>
        <div onClick={onTrade} className="absolute bottom-[13px] left-6 right-6 h-[58px] rounded-[16px] flex items-center justify-center cursor-pointer" style={{ background: 'white' }}>
          <span className="text-[#111] text-[16px] font-bold">Trade now</span>
        </div>
      </div>
    </div>
  )
}
