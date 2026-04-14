import { useState } from 'react'
import StatusBar from '../components/StatusBar'

const FONT = "'Montserrat', sans-serif"

const ASSETS = {
  arrowBack:       '/image/launch_arrowback.svg',
  info:            '/image/launch_info.svg',
  chevron:         '/image/launch_chevron.svg',
  add:             '/image/launch_add.svg',
  upload:          '/image/launch_upload.svg',
  divider:         '/image/launch_divider.svg',
  codeTabBg:       '/image/launch_codetab_bg.svg',
  usecaseIcon:     '/image/launch_usecase_icon.svg',
  usecaseDelete:   '/image/launch_usecase_delete.svg',
  linkIcon:        '/image/launch_link_icon.svg',
  linkUrlIcon:     '/image/launch_link_url_icon.svg',
  linkConfirm:     '/image/launch_link_confirm.svg',
  linkDelete:      '/image/launch_link_delete.svg',
}

// ─── 通用小组件 ────────────────────────────────────────────────────

/** 每个 Section 的顶部标题栏 */
function SectionHeader({ number, title, subtitle }) {
  return (
    <div
      className="flex flex-col gap-[11px] w-full"
      style={{ background: '#111', borderRadius: '16px 16px 0 0', paddingTop: 16, paddingBottom: 0 }}
    >
      <div className="flex items-center gap-[8px] px-4">
        {/* 数字徽标 */}
        <div
          className="flex items-center justify-center shrink-0"
          style={{ width: 18, height: 18, background: '#1f1f1f', borderRadius: 9 }}
        >
          <span style={{ color: '#777', fontSize: 10, fontWeight: 700, fontFamily: FONT, lineHeight: '15px' }}>
            {number}
          </span>
        </div>
        {/* 标题 + 副标题 */}
        <div className="flex flex-col gap-[2px]">
          <span style={{ color: 'white', fontSize: 14, fontWeight: 700, fontFamily: FONT, lineHeight: '26px' }}>
            {title}
          </span>
          {subtitle && (
            <span style={{ color: '#777', fontSize: 10, fontFamily: FONT, lineHeight: '15px' }}>
              {subtitle}
            </span>
          )}
        </div>
      </div>
      {/* 分割线 */}
      <div style={{ height: 1, background: '#333', width: '100%' }} />
    </div>
  )
}

/** 字段标签 */
function FieldLabel({ children }) {
  return (
    <span className="px-4" style={{ color: '#999', fontSize: 12, fontWeight: 700, fontFamily: FONT, lineHeight: '18px' }}>
      {children}
    </span>
  )
}

/** 单行文字输入框 */
function Input({ placeholder, value, onChange }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="launch-input"
      style={{
        display: 'block',
        width: '100%',
        height: 40,
        background: '#1f1f1f',
        border: '1px solid #333',
        borderRadius: 10,
        padding: '0 16px',
        fontSize: 12,
        fontFamily: FONT,
        outline: 'none',
        boxSizing: 'border-box',
      }}
    />
  )
}

/** 多行文字输入框 */
function Textarea({ placeholder, value, onChange, height = 70 }) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="launch-textarea"
      style={{
        display: 'block',
        width: '100%',
        height,
        background: '#1f1f1f',
        border: '1px solid #333',
        borderRadius: 10,
        padding: '16px',
        fontSize: 12,
        fontFamily: FONT,
        outline: 'none',
        resize: 'none',
        boxSizing: 'border-box',
      }}
    />
  )
}

/** 下拉选择框（静态样式） */
function SelectBox({ value, placeholder }) {
  return (
    <div
      className="flex items-center justify-between px-4"
      style={{
        height: 40,
        background: '#1f1f1f',
        border: '1px solid #333',
        borderRadius: 10,
        cursor: 'pointer',
      }}
    >
      <span style={{ color: value ? 'white' : '#777', fontSize: 12, fontFamily: FONT }}>
        {value || placeholder}
      </span>
      <img src={ASSETS.chevron} alt="" style={{ width: 24, height: 24, transform: 'rotate(90deg)' }} />
    </div>
  )
}

/** 图片上传占位框 */
function UploadBox() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-[7px]"
      style={{
        height: 100,
        background: '#1f1f1f',
        border: '1px dashed #333',
        borderRadius: 10,
        cursor: 'pointer',
      }}
    >
      <img src={ASSETS.upload} alt="" style={{ width: 16, height: 16 }} />
      <span style={{ fontSize: 11, color: '#777', fontFamily: 'sans-serif', textAlign: 'center' }}>
        Click to upload cover image
      </span>
      <span style={{ fontSize: 10, color: '#777', fontFamily: 'sans-serif' }}>
        800 × 800 px · JPG / PNG / WebP · Max 5 MB
      </span>
    </div>
  )
}

/** Add 按钮行（标签 + Add+ 图标） */
function AddRow({ label, onAdd }) {
  return (
    <div className="flex items-center justify-between">
      <FieldLabel>{label}</FieldLabel>
      <button
        onClick={onAdd}
        className="flex items-center gap-[2px] bg-transparent border-0 cursor-pointer pr-4"
        style={{ padding: 0, paddingRight: 16 }}
      >
        <span style={{ color: 'white', fontSize: 12, fontWeight: 500, fontFamily: FONT }}>Add</span>
        <img src={ASSETS.add} alt="" style={{ width: 16, height: 16 }} />
      </button>
    </div>
  )
}

// ─── Step 1：Select type ──────────────────────────────────────────
function SelectTypeSection({ type, setType }) {
  const options = [
    { key: 'agent', emoji: '🤖', label: 'Agent' },
    { key: 'prompt', emoji: '💬', label: 'Prompt' },
    { key: 'tool', emoji: '🔧', label: 'Tool' },
  ]
  return (
    <div className="flex flex-col w-full">
      <SectionHeader number="1" title="Select type" subtitle="Agent · Prompt · Tool" />
      <div
        className="flex flex-col items-center pt-4 pb-4"
        style={{ background: '#111', borderRadius: '0 0 16px 16px' }}
      >
        <div className="flex flex-col gap-[10px] w-[295px]">
        {/* 三个类型卡片：固定 93px 宽，justify-between */}
        <div className="flex items-center justify-between">
          {options.map(o => (
            <button
              key={o.key}
              onClick={() => setType(o.key)}
              className="flex flex-col items-center justify-center gap-[7px] cursor-pointer border-0"
              style={{
                width: 93,
                height: 64,
                background: '#1f1f1f',
                borderRadius: 12,
                border: type === o.key ? '1px solid white' : 'none',
                padding: 10,
              }}
            >
              <span style={{ fontSize: 18, lineHeight: '20px' }}>{o.emoji}</span>
              <span style={{ color: 'white', fontSize: 12, fontWeight: 700, fontFamily: FONT, lineHeight: '18px' }}>
                {o.label}
              </span>
            </button>
          ))}
        </div>

        {/* 提示框：仅边框，无背景 */}
        <div
          className="flex flex-col gap-[4px] px-4 py-3"
          style={{ border: '1px solid #333', borderRadius: 10 }}
        >
          <div className="flex items-center gap-1">
            <img src={ASSETS.info} alt="" style={{ width: 16, height: 16, flexShrink: 0 }} />
            <span style={{ color: '#999', fontSize: 14, fontFamily: FONT, lineHeight: '21px' }}>
              Not sure which to choose?
            </span>
          </div>
          <ul style={{ color: '#999', fontSize: 10, fontFamily: FONT, lineHeight: '14px', margin: '4px 0 0', paddingLeft: 15 }}>
            <li>Have code? → Choose Agent or Tool</li>
            <li>Only text/prompt? → Choose Prompt</li>
          </ul>
          <ul style={{ color: '#fbbf24', fontSize: 10, fontWeight: 700, fontFamily: FONT, lineHeight: '14px', margin: '4px 0 0', paddingLeft: 15 }}>
            <li>Learn more about Agents vs Prompts</li>
          </ul>
        </div>

        {/* 质量验证提示：#111 背景 + 边框 */}
        <div
          className="flex items-center gap-2 px-[10px] py-[10px]"
          style={{ background: '#111', border: '1px solid #333', borderRadius: 10 }}
        >
          <span style={{ color: '#555', fontSize: 14, lineHeight: '16px', flexShrink: 0 }}>✓</span>
          <span style={{ color: '#999', fontSize: 10, fontFamily: FONT, lineHeight: '14px' }}>
            All submissions undergo automated quality validation to maintain marketplace standards.
          </span>
        </div>
        </div>
      </div>

    </div>
  )
}

// ─── Step 2：Import from GitHub ───────────────────────────────────
function ImportGitHubSection({ number }) {
  const [url, setUrl] = useState('')
  return (
    <div className="flex flex-col w-full">
      <SectionHeader number={number} title="Import from GitHub" subtitle="Agent · Prompt · Tool" />
      <div
        className="flex flex-col items-center pt-4 pb-4"
        style={{ background: '#111', borderRadius: '0 0 16px 16px' }}
      >
        <div className="flex flex-col gap-2 w-full">
          <FieldLabel>Name</FieldLabel>
          {/* URL 输入 + Import 按钮 */}
          <div className="flex items-center gap-4 px-4">
            <div style={{ flex: 1 }}>
              <Input placeholder="GitHub repo URL" value={url} onChange={e => setUrl(e.target.value)} />
            </div>
            <button
              className="flex items-center justify-center shrink-0 cursor-pointer"
              style={{ width: 81, height: 40, border: '1px solid #333', borderRadius: 10, background: 'transparent' }}
            >
              <span style={{ color: '#777', fontSize: 12, fontFamily: FONT }}>Import</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Step 3(Agent/Tool) / Step 2(Prompt)：Basic Info ──────────────
function BasicInfoSection({ number, type }) {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')

  const [tags, setTags] = useState('')
  const [promptContent, setPromptContent] = useState('')

  const isPrompt = type === 'prompt'
  const isTool = type === 'tool'

  return (
    <div className="flex flex-col w-full">
      <SectionHeader number={number} title="Basic Info" />
      <div
        className="flex flex-col gap-3 pb-4"
        style={{ background: '#111', borderRadius: '0 0 16px 16px' }}
      >
        {/* Name */}
        <div className="flex flex-col gap-2 pt-1">
          <FieldLabel>Name</FieldLabel>
          <div className="px-4">
            <Input
              placeholder={isTool ? 'Enter tool name' : isPrompt ? 'Enter prompt name' : 'Enter agent name'}
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <FieldLabel>Description</FieldLabel>
          <div className="px-4">
            <Textarea
              placeholder={isTool ? 'Describe what your tool does...' : isPrompt ? 'Describe what your prompt does...' : 'Describe what your agent does...'}
              value={desc}
              onChange={e => setDesc(e.target.value)}
              height={70}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-2">
          <FieldLabel>Categories</FieldLabel>
          <div className="px-4">
            <SelectBox placeholder="Select categories" />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-2">
          <FieldLabel>Tags</FieldLabel>
          <div className="px-4">
            <Input
              placeholder="AI, automation, tools, etc"
              value={tags}
              onChange={e => setTags(e.target.value)}
            />
          </div>
        </div>

        {/* Image upload */}
        <div className="flex flex-col gap-2">
          <FieldLabel>{isTool ? 'Tools Image' : isPrompt ? 'Prompt Image' : 'Agent Image'}</FieldLabel>
          <div className="px-4">
            <UploadBox />
          </div>
        </div>

        {/* Prompt Content（仅 Prompt 类型） */}
        {isPrompt && (
          <div className="flex flex-col gap-2">
            <FieldLabel>Prompt Content</FieldLabel>
            <div className="px-4">
              <Textarea
                placeholder="Enter your prompt content here..."
                value={promptContent}
                onChange={e => setPromptContent(e.target.value)}
                height={120}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Step 4(Agent)：Code Configuration / Step 4(Tool)：Tool Code ──
function CodeSection({ number, title, codeLabel, codePlaceholder }) {
  const [activeTab, setActiveTab] = useState('code')
  const [packages, setPackages] = useState(['requests', 'pip3 install requests'])
  const [newPkg, setNewPkg] = useState('')
  const [showPkgInput, setShowPkgInput] = useState(false)
  const [code, setCode] = useState('')

  const tabs = ['code', 'x402 URL', 'MCP URL']

  const handleAddPackage = () => {
    if (showPkgInput) {
      if (newPkg.trim()) {
        setPackages(prev => [...prev, newPkg.trim()])
        setNewPkg('')
      }
      setShowPkgInput(false)
    } else {
      setShowPkgInput(true)
    }
  }

  const removePackage = (idx) => setPackages(prev => prev.filter((_, i) => i !== idx))

  return (
    <div className="flex flex-col w-full">
      <SectionHeader number={number} title={title} />
      <div
        className="flex flex-col gap-3 pb-4"
        style={{ background: '#111', borderRadius: '0 0 16px 16px' }}
      >
        {/* Code / x402 URL / MCP URL 选项卡 */}
        <div className="px-4 pt-1">
          <div
            className="flex items-center"
            style={{ height: 44, background: '#1f1f1f', borderRadius: 8, padding: 4, gap: 0 }}
          >
            {tabs.map(t => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className="flex-1 flex items-center justify-center cursor-pointer border-0"
                style={{
                  height: 36,
                  borderRadius: 6,
                  background: activeTab === t ? 'white' : 'transparent',
                  transition: 'background 0.15s',
                }}
              >
                <span style={{
                  fontSize: 12,
                  fontWeight: 500,
                  fontFamily: FONT,
                  color: activeTab === t ? '#111' : '#777',
                }}>
                  {t}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 警告框：Traditional Agent Code */}
        <div className="mx-4 flex flex-col gap-1 p-[10px]"
          style={{ background: 'rgba(69,26,3,0.15)', border: '1px solid #b45309', borderRadius: 8 }}>
          <span style={{ color: '#fbbf24', fontSize: 12, fontWeight: 700, fontFamily: FONT, lineHeight: '18px' }}>
            Traditional Agent Code
          </span>
          <span style={{ color: '#fbbf24', fontSize: 10, fontFamily: FONT, lineHeight: '14px' }}>
            Provide your agent's code directly. Include type hints and docstrings for better validation and documentation. The code will be validated before submission.
          </span>
        </div>

        {/* Programming Language */}
        <div className="flex flex-col gap-2">
          <FieldLabel>Programming Language</FieldLabel>
          <div className="px-4">
            <SelectBox value="Python" />
          </div>
        </div>

        {/* Package Requirements */}
        <div className="flex flex-col gap-2 px-4">
          <AddRow label="Package Requirements" onAdd={handleAddPackage} />
          <div className="flex flex-wrap gap-2">
            {packages.map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-1 px-[10px] py-2 cursor-pointer"
                style={{ background: '#1f1f1f', borderRadius: 10 }}
                onClick={() => removePackage(i)}
              >
                <span style={{ color: '#777', fontSize: 12, fontFamily: FONT, lineHeight: '18px' }}>{p}</span>
              </div>
            ))}
            {showPkgInput && (
              <input
                autoFocus
                type="text"
                value={newPkg}
                onChange={e => setNewPkg(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleAddPackage() }}
                placeholder="package name"
                style={{
                  background: '#1f1f1f',
                  border: '1px solid #555',
                  borderRadius: 10,
                  padding: '8px 10px',
                  color: 'white',
                  fontSize: 12,
                  fontFamily: FONT,
                  outline: 'none',
                  width: 120,
                }}
              />
            )}
          </div>
        </div>

        {/* Agent / Tool Code */}
        <div className="flex flex-col gap-2">
          <FieldLabel>{codeLabel}</FieldLabel>
          <div className="px-4">
            <Textarea
              placeholder={codePlaceholder}
              value={code}
              onChange={e => setCode(e.target.value)}
              height={90}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Step 4(Agent)/Step 3(Prompt)/Step 5(Tool)：Use Cases & Links ─
function UseCasesSection({ number }) {
  const [useCases, setUseCases] = useState([
    { id: 1, title: '', desc: '' },
    { id: 2, title: '', desc: '' },
  ])
  const [links, setLinks] = useState([
    { id: 1, name: '', url: '' },
    { id: 2, name: '', url: '' },
  ])
  const nextId = (arr) => Math.max(0, ...arr.map(x => x.id)) + 1

  const addUseCase = () => setUseCases(prev => [...prev, { id: nextId(prev), title: '', desc: '' }])
  const removeUseCase = (id) => setUseCases(prev => prev.filter(u => u.id !== id))
  const updateUseCase = (id, field, val) => setUseCases(prev => prev.map(u => u.id === id ? { ...u, [field]: val } : u))

  const addLink = () => setLinks(prev => [...prev, { id: nextId(prev), name: '', url: '' }])
  const removeLink = (id) => setLinks(prev => prev.filter(l => l.id !== id))
  const updateLink = (id, field, val) => setLinks(prev => prev.map(l => l.id === id ? { ...l, [field]: val } : l))

  return (
    <div className="flex flex-col w-full">
      <SectionHeader number={number} title="Use Cases&links" />
      <div
        className="flex flex-col gap-0 pb-4"
        style={{ background: '#111', borderRadius: '0 0 16px 16px' }}
      >
        {/* ── Use Cases ── */}
        <div className="flex flex-col gap-3 pt-3">
          <div className="px-4">
            <AddRow label="Use Cases" onAdd={addUseCase} />
          </div>
          <div className="flex flex-col gap-3 px-4">
            {useCases.map((uc, idx) => (
              <div
                key={uc.id}
                className="flex flex-col gap-[10px] pt-4 px-4 pb-4"
                style={{
                  background: '#1f1f1f',
                  border: '1px solid #333',
                  borderRadius: 10,
                }}
              >
                {/* 序号行 + 删除按钮 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[6px]">
                    <img src={ASSETS.usecaseIcon} alt="" style={{ width: 14, height: 14 }} />
                    <span style={{ color: 'white', fontSize: 11, fontWeight: 700, letterSpacing: '0.66px', fontFamily: 'Inter, sans-serif' }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <button
                    onClick={() => removeUseCase(uc.id)}
                    className="flex items-center justify-center cursor-pointer border-0"
                    style={{ width: 26, height: 26, background: '#1f1f1f', border: '1px solid #333', borderRadius: 7 }}
                  >
                    <img src={ASSETS.usecaseDelete} alt="" style={{ width: 12, height: 12 }} />
                  </button>
                </div>

                {/* Title 输入 */}
                <input
                  type="text"
                  placeholder="Title  (e.g., Content Generation)"
                  value={uc.title}
                  onChange={e => updateUseCase(uc.id, 'title', e.target.value)}
                  className="launch-input"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '0.5px solid #333',
                    outline: 'none',
                    fontSize: 12,
                    fontFamily: FONT,
                    lineHeight: '18px',
                    paddingBottom: 8,
                    width: '100%',
                  }}
                />

                {/* Description 输入 */}
                <input
                  type="text"
                  placeholder="Describe how this use case applies to your product…"
                  value={uc.desc}
                  onChange={e => updateUseCase(uc.id, 'desc', e.target.value)}
                  className="launch-input"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    fontSize: 12,
                    fontFamily: FONT,
                    lineHeight: '18px',
                    width: '100%',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Links ── */}
        <div className="flex flex-col gap-3 pt-3">
          <div className="px-4">
            <AddRow label="Links" onAdd={addLink} />
          </div>
          <div className="flex flex-col gap-[10px] px-4">
            {links.map((lk, idx) => (
              <div
                key={lk.id}
                className="flex items-center overflow-hidden"
                style={{ border: '1px solid #333', borderRadius: 10 }}
              >
                {/* 左侧：序号列 */}
                <div
                  className="flex flex-col items-center justify-center gap-[3px] shrink-0"
                  style={{ width: 56.5, height: 64, borderRight: '1px solid #333' }}
                >
                  <img src={ASSETS.linkIcon} alt="" style={{ width: 14, height: 14 }} />
                  <span style={{ color: '#3a3a3a', fontSize: 10, fontWeight: 700, letterSpacing: '0.5px', fontFamily: 'Inter, sans-serif' }}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* 中间：Name / URL 两行 */}
                <div className="flex flex-col flex-1">
                  <div
                    className="flex items-center px-[10px]"
                    style={{ height: 32, borderBottom: '1px solid #333' }}
                  >
                    <input
                      type="text"
                      placeholder="Name  (e.g., GitHub, Demo)"
                      value={lk.name}
                      onChange={e => updateLink(lk.id, 'name', e.target.value)}
                      className="launch-input"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        fontSize: 12,
                        fontFamily: 'Inter, sans-serif',
                        width: '100%',
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-[7px] px-[10px]" style={{ height: 32 }}>
                    <img src={ASSETS.linkUrlIcon} alt="" style={{ width: 13, height: 13, flexShrink: 0 }} />
                    <input
                      type="text"
                      placeholder="https://example.com"
                      value={lk.url}
                      onChange={e => updateLink(lk.id, 'url', e.target.value)}
                      className="launch-input"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        fontSize: 10,
                        fontFamily: 'Inter, sans-serif',
                        flex: 1,
                      }}
                    />
                  </div>
                </div>

                {/* 右侧：操作按钮列 */}
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{ width: 56.5, height: 64, borderLeft: '1px solid #333' }}
                >
                  <button
                    onClick={() => removeLink(lk.id)}
                    className="flex items-center justify-center cursor-pointer border-0 bg-transparent"
                    style={{ width: 14, height: 14 }}
                  >
                    <img src={ASSETS.linkDelete} alt="" style={{ width: 14, height: 14 }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Step 5(Agent)/Step 4(Prompt)/Step 6(Tool)：Pricing ───────────
function PricingSection({ number, isTool }) {
  const [pricing, setPricing] = useState('free')
  const options = [
    { key: 'free', label: 'Free' },
    { key: 'paid', label: 'Paid' },
    { key: 'tokenization', label: 'Tokenization' },
  ]
  return (
    <div className="flex flex-col w-full">
      <SectionHeader number={number} title="Pricing" />
      <div
        className="flex flex-col gap-3 pb-4"
        style={{ background: '#111', borderRadius: '0 0 16px 16px' }}
      >
        <div className="flex flex-col gap-2 pt-1">
          <FieldLabel>Pricing</FieldLabel>
          <div className="flex items-center justify-between gap-2 px-4">
            {options.map(o => {
              const disabled = isTool && o.key === 'tokenization'
              const selected = pricing === o.key
              return (
                <button
                  key={o.key}
                  onClick={() => !disabled && setPricing(o.key)}
                  className="flex flex-col items-center justify-center gap-[7px] border-0 cursor-pointer"
                  style={{
                    flex: 1,
                    height: 64,
                    background: '#1f1f1f',
                    borderRadius: 12,
                    border: selected ? '1px solid white' : '1px solid transparent',
                    opacity: disabled ? 0.4 : 1,
                    cursor: disabled ? 'not-allowed' : 'pointer',
                  }}
                >
                  {/* 单选圆点 */}
                  <div
                    className="flex items-center justify-center"
                    style={{ width: 14, height: 14, border: '1px solid white', borderRadius: 7 }}
                  >
                    {selected && (
                      <div style={{ width: 7, height: 7, background: 'white', borderRadius: 3.5 }} />
                    )}
                  </div>
                  <span style={{
                    fontSize: 12,
                    fontWeight: 700,
                    fontFamily: FONT,
                    color: selected ? 'white' : '#777',
                  }}>
                    {o.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Tool 特有警告 */}
        {isTool && (
          <div
            className="mx-4 flex items-center gap-2 p-[10px]"
            style={{ background: 'rgba(127,0,0,0.15)', border: '1px solid #991b1b', borderRadius: 8 }}
          >
            <span style={{ color: '#ed1717', fontSize: 10, fontFamily: FONT, lineHeight: '14px' }}>
              Tokenization is not available for tools
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── 主页面 ───────────────────────────────────────────────────────
export default function LaunchPage({ onBack }) {
  const [type, setType] = useState('agent')

  const isAgent  = type === 'agent'
  const isPrompt = type === 'prompt'
  const isTool   = type === 'tool'

  const handleClearForm = () => {
    // 触发子组件重置：通过 key 强制重新挂载
    setType(type)
  }

  return (
    <div className="flex flex-col h-full" style={{ background: '#0a0a0a', fontFamily: FONT }}>
      <StatusBar />

      {/* 固定顶部导航 */}
      <div className="shrink-0" style={{ height: 56, position: 'relative' }}>
        <button
          onClick={onBack}
          className="absolute flex items-center justify-center bg-transparent border-0 cursor-pointer"
          style={{ left: 24, top: '50%', transform: 'translateY(-50%)', padding: 0 }}
        >
          <img src={ASSETS.arrowBack} alt="Back" style={{ width: 24, height: 24 }} />
        </button>
      </div>

      {/* 可滚动内容区 */}
      <div className="flex-1 overflow-y-auto scroll-hide" style={{ paddingBottom: 100 }}>
        <div className="flex flex-col px-6">

          {/* 页面标题 */}
          <div className="flex flex-col gap-1 mb-5">
            <h1 style={{ color: 'white', fontSize: 24, fontWeight: 700, lineHeight: '33px', margin: 0, fontFamily: FONT }}>
              Launch Now
            </h1>
            <p style={{ color: '#999', fontSize: 12, lineHeight: '18px', margin: 0, fontFamily: FONT }}>
              Publish Your Product To The Swarms Marketplace
            </p>
          </div>

          {/* Step 1：Select type */}
          <SelectTypeSection type={type} setType={setType} />

          <div style={{ height: 16 }} />

          {/* Step 2：Import from GitHub（Agent / Prompt / Tool） */}
          <>
            <ImportGitHubSection number="2" />
            <div style={{ height: 16 }} />
          </>

          {/* Step 3：Basic Info */}
          <BasicInfoSection number="3" type={type} />

          <div style={{ height: 16 }} />

          {/* Step 4(Agent)：Code Configuration */}
          {isAgent && (
            <>
              <CodeSection
                number="4"
                title="Code Configuration"
                codeLabel="Agent Code"
                codePlaceholder="Paste your agent's code here... (Add types and docstrings)"
              />
              <div style={{ height: 16 }} />
            </>
          )}

          {/* Step 4(Tool)：Tool Code */}
          {isTool && (
            <>
              <CodeSection
                number="4"
                title="Tool Code"
                codeLabel="Tools Code"
                codePlaceholder="Paste your tool's code here..."
              />
              <div style={{ height: 16 }} />
            </>
          )}

          {/* Use Cases & Links */}
          <UseCasesSection number={isPrompt ? '4' : '5'} />

          <div style={{ height: 16 }} />

          {/* Pricing */}
          <PricingSection number={isPrompt ? '5' : '6'} isTool={isTool} />

        </div>
      </div>

      {/* 底部固定操作栏 */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center gap-4 px-6"
        style={{
          height: 83,
          background: 'rgba(7,7,7,0.5)',
          backdropFilter: 'blur(25px)',
          boxShadow: '0px 10px 20px 0px #070707',
        }}
      >
        {/* Clear Form */}
        <button
          onClick={handleClearForm}
          className="flex items-center justify-center cursor-pointer"
          style={{
            flex: 1,
            height: 58,
            background: '#111',
            border: '1px solid #333',
            borderRadius: 16,
          }}
        >
          <span style={{ color: 'white', fontSize: 16, fontWeight: 700, fontFamily: FONT }}>Clear Form</span>
        </button>

        {/* Submit */}
        <button
          className="flex items-center justify-center cursor-pointer border-0"
          style={{
            flex: 1,
            height: 58,
            background: '#ed1717',
            borderRadius: 16,
          }}
        >
          <span style={{ color: 'white', fontSize: 16, fontWeight: 700, fontFamily: FONT }}>
            {isPrompt ? 'Submit prompt' : 'Submit agent'}
          </span>
        </button>
      </div>
    </div>
  )
}
