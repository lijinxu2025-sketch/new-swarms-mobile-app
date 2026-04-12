import { useState } from 'react'
import HomePage from './pages/HomePage'
import FilterPage from './pages/FilterPage'
import SearchPage from './pages/SearchPage'
import AgentDetailPage from './pages/AgentDetailPage'
import ReviewsPage from './pages/ReviewsPage'
import TradePage from './pages/TradePage'
import CreatorPage from './pages/CreatorPage'

export default function App() {
  const [page, setPage] = useState('home')

  if (page === 'filter') return <FilterPage onBack={() => setPage('home')} />
  if (page === 'search') return <SearchPage onBack={() => setPage('home')} />
  if (page === 'agent-detail') return <AgentDetailPage onBack={() => setPage('home')} onReviews={() => setPage('reviews')} onTrade={() => setPage('trade')} onCreator={() => setPage('creator')} />
  if (page === 'reviews') return <ReviewsPage onBack={() => setPage('agent-detail')} />
  if (page === 'trade') return <TradePage onClose={() => setPage('agent-detail')} />
  if (page === 'creator') return <CreatorPage onBack={() => setPage('agent-detail')} />

  return (
    <HomePage
      onFilter={() => setPage('filter')}
      onSearch={() => setPage('search')}
      onAgentClick={() => setPage('agent-detail')}
      onChat={() => {}}
      onProfile={() => {}}
      onLaunch={() => {}}
      onTrending={() => {}}
      onSettings={() => {}}
    />
  )
}
