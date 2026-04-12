export default function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 h-[44px] shrink-0">
      <span className="text-white font-semibold text-[15px] tracking-tight">9:41</span>
      <div className="flex items-center gap-[5px]">
        {/* Signal */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
          <rect x="0"    y="6" width="3" height="6"  rx="1" />
          <rect x="4.5"  y="4" width="3" height="8"  rx="1" />
          <rect x="9"    y="2" width="3" height="10" rx="1" />
          <rect x="13.5" y="0" width="3" height="12" rx="1" />
        </svg>
        {/* Wifi */}
        <svg width="16" height="12" viewBox="0 0 20 14" fill="white">
          <path d="M10 10.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
          <path d="M10 6.5a6.5 6.5 0 0 1 4.6 1.9l1.5-1.5a8.5 8.5 0 0 0-12.2 0l1.5 1.5A6.5 6.5 0 0 1 10 6.5z" opacity=".6" />
          <path d="M10 2a11.5 11.5 0 0 1 8.1 3.35l1.5-1.5A13.5 13.5 0 0 0 .4 3.85l1.5 1.5A11.5 11.5 0 0 1 10 2z" opacity=".3" />
        </svg>
        {/* Battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="white">
          <rect x="0.5" y="0.5" width="20" height="11" rx="2" stroke="white" strokeWidth="1" fill="none" opacity=".35" />
          <rect x="1.5" y="1.5" width="18" height="9" rx="1.5" fill="white" />
          <path d="M22 4v4a2 2 0 0 0 0-4z" fill="white" opacity=".4" />
        </svg>
      </div>
    </div>
  )
}
