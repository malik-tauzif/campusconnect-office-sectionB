import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiRequest } from '../api.js'
import { getEventVisuals } from '../data/eventVisuals.js'
import { useUser } from '../userContext.js'

const SKELETON_CARDS = Array.from({ length: 3 }, (_, index) => index)

function formatRegistrationDate(value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
  }).format(date)
}

function MyRegistrations() {
  const { currentUser } = useUser()
  const [registrations, setRegistrations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let isCurrentRequest = true

    async function loadRegistrations() {
      setIsLoading(true)
      setHasError(false)

      try {
        const result = await apiRequest('/me/registrations')
        if (isCurrentRequest) {
          setRegistrations(result)
        }
      } catch {
        if (isCurrentRequest) {
          setHasError(true)
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoading(false)
        }
      }
    }

    loadRegistrations()
    return () => {
      isCurrentRequest = false
    }
  }, [currentUser.id, retryCount])

  return (
    <section className="mx-auto max-w-4xl">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          My Registered Events
        </h1>
        <span className="inline-flex items-center rounded-full border border-brand-200 bg-brand-100 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
          {isLoading || hasError ? '– Active' : `${registrations.length} Active`}
        </span>
      </div>

      {isLoading ? (
        <div aria-label="Loading registrations" aria-busy="true" className="space-y-4">
          {SKELETON_CARDS.map((card) => (
            <div key={card} className="animate-pulse rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="h-5 w-2/5 rounded bg-slate-200" />
              <div className="mt-3 h-4 w-1/2 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      ) : hasError ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm" role="alert">
          <p className="text-sm text-slate-600">We couldn’t load your registrations. Please try again.</p>
          <button
            className="mt-5 rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
          >
            Retry
          </button>
        </div>
      ) : registrations.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center md:p-12">
          <div className="mb-4 flex size-14 items-center justify-center rounded-2xl border border-brand-100 bg-brand-50 text-brand-600 shadow-sm">
            <svg aria-hidden="true" className="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
              <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25A2.25 2.25 0 0 1 18.75 21H5.25A2.25 2.25 0 0 1 3 18.75Zm0-7.5h18" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="mb-1.5 text-xl font-bold tracking-tight text-slate-900">
            No registrations yet
          </h2>
          <p className="mb-6 max-w-sm text-sm text-slate-500">
            You haven&apos;t signed up for any campus tech workshops or hackathons yet.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-600/30 transition-colors hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          >
            Explore Campus Events
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {registrations.map((registration) => {
            const event = registration.events
            const isClosed = event.status === 'closed'
            const visuals = getEventVisuals(event.id)

            return (
              <Link
                key={registration.id}
                to={`/events/${event.id}`}
                className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 text-xl font-bold text-white">
                      {visuals.image ? (
                        <img src={visuals.image} alt="" className="size-full object-cover" />
                      ) : (
                        event.title.trim().charAt(0).toUpperCase()
                      )}
                    </div>
                    <div>
                    <h2 className="text-lg font-bold tracking-tight text-slate-900">{event.title}</h2>
                    <p className="mt-1 flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
                      <span className={`inline-block size-2 rounded-full ${isClosed ? 'bg-slate-400' : 'bg-emerald-500'}`} />
                      <span>Status: {isClosed ? 'Closed' : 'Open'}</span>
                      <span className="text-slate-300">•</span>
                      <span>Registered {formatRegistrationDate(registration.created_at)}</span>
                    </p>
                    </div>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                    <svg aria-hidden="true" className="size-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path d="m4.5 12.75 6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Registered
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default MyRegistrations