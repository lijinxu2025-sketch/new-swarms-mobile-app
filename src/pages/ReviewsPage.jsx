import { useState } from 'react'
import StatusBar from '../components/StatusBar'

// ─── Assets ────────────────────────────────────────────────────────
const ASSETS = {
  arrowBack: '/image/reviewspage_arrowback.svg',
  starFilled: '/image/reviewspage_starfilled.svg',
  starEmpty: '/image/reviewspage_starempty.svg',
  thumbUp: '/image/reviewspage_thumbup.svg',
  thumbDown: '/image/reviewspage_thumbdown.svg',
  writeIcon: '/image/reviewspage_writeicon.svg',
  avatar1: '/image/reviewspage_avatar1.png',
  avatar2: '/image/reviewspage_avatar2.png',
  avatar3: '/image/reviewspage_avatar3.png',
  starLargeFilled: '/image/reviewspage_starlargefilled.svg',
  starLargeEmpty: '/image/reviewspage_starlargeempty.svg',
}

const RATING_DATA = [
  { stars: 5, count: 12 },
  { stars: 4, count: 5 },
  { stars: 3, count: 4 },
  { stars: 2, count: 2 },
  { stars: 1, count: 0 },
]

const REVIEWS = [
  { name: 'Jay', avatar: ASSETS.avatar1, stars: 4, date: 'September 20, 2025', text: "Best market analysis tool I've used. Period.", likes: 20 },
  { name: 'Leo', avatar: ASSETS.avatar2, stars: 4, date: 'September 20, 2025', text: "Best market analysis tool I've used. Period.", likes: 15 },
  { name: 'Hank', avatar: ASSETS.avatar3, stars: 4, date: 'September 20, 2025', text: "Best market analysis tool I've used. Period.", likes: 8 },
]

// ─── Sub-components ────────────────────────────────────────────────
function Stars({ count, size = 16 }) {
  return (
    <div className="flex items-center" style={{ gap: '2px' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <img
          key={i}
          src={i <= count ? ASSETS.starFilled : ASSETS.starEmpty}
          alt=""
          style={{ width: size, height: size }}
        />
      ))}
    </div>
  )
}

function RatingBar({ stars, count, maxCount }) {
  const barWidth = maxCount > 0 ? (count / maxCount) * 100 : 0
  return (
    <div className="flex items-center gap-2 w-full">
      <Stars count={stars} size={14} />
      <div className="flex-1 h-2 rounded-[4px] overflow-hidden" style={{ background: '#333' }}>
        <div
          className="h-full rounded-[4px]"
          style={{ background: '#ed1717', width: `${barWidth}%` }}
        />
      </div>
      <span className="text-white text-[14px] leading-[21px] w-[20px] text-right" style={{ fontFamily: "'Montserrat', sans-serif" }}>{count}</span>
    </div>
  )
}

function ReviewCard({ name, avatar, stars, date, text, likes }) {
  return (
    <div className="w-full rounded-[16px] p-4 flex flex-col gap-2" style={{ background: '#111' }}>
      {/* User */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <img src={avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
          <span className="text-white text-[13px] font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>{name}</span>
        </div>
        <Stars count={stars} size={16} />
      </div>
      {/* Date */}
      <span className="text-white text-[12px] leading-[18px]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{date}</span>
      {/* Text */}
      <p className="text-white text-[12px] leading-[18px] m-0" style={{ fontFamily: "'Montserrat', sans-serif" }}>{text}</p>
      {/* Actions */}
      <div className="flex items-center justify-end gap-4">
        <div className="flex items-center gap-1">
          <img src={ASSETS.thumbUp} alt="" className="w-4 h-4" />
          <span className="text-white text-[13px] font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>({likes})</span>
        </div>
        <img src={ASSETS.thumbDown} alt="" className="w-4 h-4" />
      </div>
    </div>
  )
}

// ─── Write Review Modal ───────────────────────────────────────────
function WriteReviewModal({ onClose, onSubmit }) {
  const [rating, setRating] = useState(0)
  const [text, setText] = useState('')

  const handleSubmit = () => {
    if (rating < 1) return
    onSubmit({ rating, text })
    onClose()
  }

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col justify-end"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.6)' }}
        onClick={onClose}
      />

      {/* Bottom sheet */}
      <div className="relative z-10 flex flex-col items-center px-6 pt-0 pb-0" style={{ background: '#1f1f1f', borderRadius: '20px 20px 0 0', width: '100%', maxWidth: 376, height: 640 }}>
        {/* Handle */}
        <div className="w-[60px] h-[6px] rounded-[3px] mt-3" style={{ background: 'white' }} />

        {/* Content */}
        <div className="flex flex-col items-center gap-10 w-full mt-4">
          {/* Title + Stars */}
          <div className="flex flex-col items-center gap-[17px]">
            <h2 className="text-white text-[18px] font-bold leading-[27px] m-0 text-center">What is you rate?</h2>
            <div className="flex items-center gap-[21px]">
              {[1, 2, 3, 4, 5].map(i => (
                <button
                  key={i}
                  onClick={() => setRating(i)}
                  className="bg-transparent border-0 cursor-pointer p-0"
                >
                  <img
                    src={ASSETS.starLargeFilled}
                    alt=""
                    style={{
                      width: 36,
                      height: 33,
                      filter: i <= rating ? 'none' : 'grayscale(100%) brightness(0.4)',
                      transition: 'filter 0.15s',
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Text area */}
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="text-white text-[16px] leading-[26px] text-center">
              <p className="m-0">Please share your opinion</p>
              <p className="m-0">about the product</p>
            </div>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Your review"
              className="w-full h-[153px] rounded-[8px] p-3 text-[14px] leading-[21px] resize-none outline-none"
              style={{
                background: 'transparent',
                border: '1px solid #333',
                color: 'white',
                fontFamily: "'Montserrat', sans-serif",
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>

        {/* Send Review button */}
        <div className="w-full py-6 mt-6">
          <button
            onClick={handleSubmit}
            className="w-full h-[58px] rounded-[16px] border-0 cursor-pointer flex items-center justify-center"
            style={{ background: rating >= 1 ? 'white' : '#333' }}
          >
            <span
              className="text-[16px] font-bold leading-[1.2]"
              style={{ color: rating >= 1 ? '#111' : '#777', fontFamily: "'Montserrat', sans-serif" }}
            >
              Send Review
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────
export default function ReviewsPage({ onBack }) {
  const maxCount = Math.max(...RATING_DATA.map(r => r.count))
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="relative flex flex-col h-full bg-black" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <StatusBar />

      {/* Top nav: back arrow only */}
      <div className="shrink-0 px-6 pt-4 pb-2">
        <button onClick={onBack} className="bg-transparent border-0 cursor-pointer p-0">
          <img src={ASSETS.arrowBack} alt="Back" className="w-6 h-6" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scroll-hide px-6 pb-[100px]">
        <div className="flex flex-col gap-10">
          {/* Rating summary */}
          <div className="flex flex-col gap-6">
            <h1 className="text-white text-[18px] font-bold leading-[27px] m-0">Rating&Reviews</h1>
            <div className="flex items-start gap-6">
              {/* Score */}
              <div className="flex flex-col gap-[3px]">
                <span className="text-white text-[36px] font-bold leading-[50px]">4.3</span>
                <span className="text-white text-[14px] leading-[21px]">23 ratings</span>
              </div>
              {/* Bars */}
              <div className="flex-1 flex flex-col gap-0">
                {RATING_DATA.map(r => (
                  <RatingBar key={r.stars} stars={r.stars} count={r.count} maxCount={maxCount} />
                ))}
              </div>
            </div>
          </div>

          {/* Reviews list */}
          <div className="flex flex-col gap-5">
            <h2 className="text-white text-[18px] font-normal leading-[26px] m-0">Reviews</h2>
            <div className="flex flex-col gap-2">
              {REVIEWS.map((review, i) => (
                <ReviewCard key={i} {...review} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gradient fade at bottom */}
      <div
        className="absolute left-0 right-0 bottom-0 pointer-events-none"
        style={{ height: 121, background: 'linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, black 77.6%)' }}
      />

      {/* Write a review button — floating bottom right */}
      <button
        onClick={() => setShowModal(true)}
        className="absolute z-10 flex items-center gap-1 rounded-[25px] border-0 cursor-pointer"
        style={{
          bottom: 10,
          right: 17,
          padding: '6px',
          background: 'white',
          boxShadow: '0px 4px 8px rgba(211, 38, 38, 0.25)',
        }}
      >
        <div className="w-6 h-6 overflow-hidden flex items-center justify-center">
          <img src={ASSETS.writeIcon} alt="" className="w-[13px] h-[13px]" />
        </div>
        <span className="text-[12px] leading-[18px]" style={{ fontFamily: "'Montserrat', sans-serif", color: '#111' }}>Write a review</span>
      </button>

      {/* Modal */}
      {showModal && (
        <WriteReviewModal
          onClose={() => setShowModal(false)}
          onSubmit={(review) => console.log('Review submitted:', review)}
        />
      )}
    </div>
  )
}
