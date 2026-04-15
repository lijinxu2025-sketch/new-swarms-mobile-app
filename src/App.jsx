import { useState } from 'react'
import ConfigPage from './pages/ConfigPage'
import HomePage from './pages/HomePage'
import FilterPage from './pages/FilterPage'
import SearchPage from './pages/SearchPage'
import AgentDetailPage from './pages/AgentDetailPage'
import ReviewsPage from './pages/ReviewsPage'
import TradePage from './pages/TradePage'
import CreatorPage from './pages/CreatorPage'
import LaunchPage from './pages/LaunchPage'
import ChatPage from './pages/ChatPage'
import SettingsPage from './pages/SettingsPage'
import EditProfilePage from './pages/EditProfilePage'
import BillingPage from './pages/BillingPage'
import PurchasesPage from './pages/PurchasesPage'
import SocialLinksPage from './pages/SocialLinksPage'
import ThemePage from './pages/ThemePage'
import ReferralPage from './pages/ReferralPage'
import StakingPage from './pages/StakingPage'

export default function App() {
  const [page, setPage] = useState('home')

  if (page === 'filter') return <FilterPage onBack={() => setPage('home')} />
  if (page === 'search') return <SearchPage onBack={() => setPage('home')} />
  if (page === 'agent-detail') return <AgentDetailPage onBack={() => setPage('home')} onReviews={() => setPage('reviews')} onTrade={() => setPage('trade')} onCreator={() => setPage('creator')} />
  if (page === 'reviews') return <ReviewsPage onBack={() => setPage('agent-detail')} />
  if (page === 'trade') return <TradePage onClose={() => setPage('agent-detail')} />
  if (page === 'creator') return <CreatorPage onBack={() => setPage('agent-detail')} />
  if (page === 'launch') return <LaunchPage onBack={() => setPage('home')} />
  // ── shared nav callbacks ──────────────────────────────────────────
  const nav = {
    onChat:     () => setPage('chat'),
    onHome:     () => setPage('home'),
    onLaunch:   () => setPage('launch'),
    onTrending: () => {},
    onSettings: () => setPage('settings'),
  }

  if (page === 'config') return <ConfigPage onBack={() => setPage('chat')} />

  if (page === 'chat') return (
    <ChatPage
      onHome={nav.onHome}
      onLaunch={nav.onLaunch}
      onProfile={nav.onHome}
      onTrending={nav.onTrending}
      onSettings={nav.onSettings}
      onConfig={() => setPage('config')}
    />
  )

  if (page === 'edit-profile') return <EditProfilePage onBack={() => setPage('settings')} />
  if (page === 'billing')      return <BillingPage     onBack={() => setPage('settings')} />
  if (page === 'purchases')    return <PurchasesPage   onBack={() => setPage('settings')} />
  if (page === 'staking')      return <StakingPage     onBack={() => setPage('settings')} />
  if (page === 'social-links') return <SocialLinksPage onBack={() => setPage('settings')} />
  if (page === 'theme')        return <ThemePage       onBack={() => setPage('settings')} />
  if (page === 'referral')     return <ReferralPage    onBack={() => setPage('settings')} />

  if (page === 'settings') return (
    <SettingsPage
      onChat={nav.onChat}
      onHome={nav.onHome}
      onLaunch={nav.onLaunch}
      onTrending={nav.onTrending}
      onEditProfile={() => setPage('edit-profile')}
      onBilling={()     => setPage('billing')}
      onPurchases={()   => setPage('purchases')}
      onStaking={()     => setPage('staking')}
      onSocialLinks={()  => setPage('social-links')}
      onTheme={()        => setPage('theme')}
      onReferral={()     => setPage('referral')}
    />
  )

  return (
    <HomePage
      onFilter={() => setPage('filter')}
      onSearch={() => setPage('search')}
      onAgentClick={() => setPage('agent-detail')}
      onChat={nav.onChat}
      onProfile={nav.onHome}
      onLaunch={nav.onLaunch}
      onTrending={nav.onTrending}
      onSettings={nav.onSettings}
    />
  )
}
