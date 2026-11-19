import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiRequest } from '../api.js'
import { getEventVisuals } from '../data/eventVisuals.js'

const SKELETON_CARDS = Array.from({ length: 6 }, (_, index) => index)

function ExploreEvents() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState('All')
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search.trim())
    }, 300)

    return () => window.clearTimeout(timer)
  }, [search])

  useEffect(() => {
    let isCurrentRequest = true

    async function loadEvents() {
      setIsLoading(true)
      setError(null)

      const query = debouncedSearch
        ? `?search=${encodeURIComponent(debouncedSearch)}`
        : ''

      try {
        const result = await apiRequest(`/events${query}`)
        if (isCurrentRequest) {
          setEvents(result)
        }
      } catch (requestError) {
        if (isCurrentRequest) {
          setError(requestError.message || 'Please try again.')
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoading(false)
        }
      }
    }

    loadEvents()
    return () => {
      isCurrentRequest = false
    }
  }, [debouncedSearch, retryCount])

  function submitSearch(event) {
    event.preventDefault()
    setDebouncedSearch(search.trim())
  }

  const tags = ['All', ...new Set(events.map((event) => getEventVisuals(event.id).tag))]
  const visibleEvents = selectedTag === 'All'
    ? events
    : events.filter((event) => getEventVisuals(event.id).tag === selectedTag)

  return (
    <div>
      <section className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
          Find your next campus event
        </h1>
        <p className="mt-2 text-base text-slate-500">
          Browse peer-led tech meetups, hackathons, robotics challenges, and community workshops.
        </p>
      </section>

      <form
        className="mb-6 flex max-w-4xl items-center gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm transition focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/10"
        onSubmit={submitSearch}
        role="search"
      >
        <label className="flex min-w-0 flex-1 items-center gap-3 pl-4" htmlFor="event-search-input">
          <svg aria-hidden="true" className="size-5 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="m21 21-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          <input
            id="event-search-input"
            className="w-full border-0 bg-transparent py-3 text-base text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-0"
            type="search"
            placeholder="Search events"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
        <button
          className="shrink-0 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-1"
          type="submit"
        >
          Search
        </button>
      </form>

      {!isLoading && !error && events.length > 0 && (
        <nav aria-label="Filter events by tag" className="mb-10 flex flex-wrap items-center gap-2.5">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              aria-pressed={selectedTag === tag}
              onClick={() => setSelectedTag(tag)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                selectedTag === tag
                  ? 'bg-brand-600 text-white shadow-sm hover:bg-brand-700'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-brand-200 hover:bg-brand-50/50 hover:text-brand-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </nav>
      )}

      {isLoading ? (
        <section aria-label="Loading events" aria-busy="true" className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SKELETON_CARDS.map((card) => (
            <div key={card} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="h-48 animate-pulse bg-slate-200" />
              <div className="space-y-4 p-5">
                <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-1/3 animate-pulse rounded bg-slate-100" />
                <div className="h-6 w-20 animate-pulse rounded-full bg-slate-100" />
              </div>
            </div>
          ))}
        </section>
      ) : error ? (
        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm" role="alert">
          <h2 className="text-lg font-semibold text-slate-900">We couldn’t load events</h2>
          <p className="mt-2 text-sm text-slate-600">{error}</p>
          <button
            className="mt-5 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
          >
            Retry
          </button>
        </section>
      ) : visibleEvents.length === 0 ? (
        <p className="py-12 text-center text-slate-500">No events found</p>
      ) : (
        <section aria-label="Events" className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visibleEvents.map((event) => {
            const isOpen = event.status === 'open'
            const visuals = getEventVisuals(event.id)

            return (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
              >
                <div className="relative flex h-48 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 text-6xl font-bold text-white">
                  {!visuals.image && event.title.trim().charAt(0).toUpperCase()}
                  {visuals.image && (
                    <img
                      src={visuals.image}
                      alt={`${event.title} event`}
                      className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                  <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2.5 py-1 text-xs font-semibold text-brand-700 shadow-sm backdrop-blur">
                    {visuals.tag}
                  </span>
                  <span className={`absolute right-3 top-3 rounded-md px-2.5 py-1 text-xs font-semibold shadow-sm backdrop-blur ${
                    isOpen ? 'bg-emerald-500/90 text-white' : 'bg-rose-600 text-white'
                  }`}>
                    {isOpen ? 'OPEN' : 'CLOSED'}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-brand-600">
                    {event.title}
                  </h2>
                  <div className="mt-3 space-y-2 text-xs text-slate-500">
                    {visuals.date && <p>{visuals.date}</p>}
                    {visuals.venue && <p>{visuals.venue}</p>}
                    <p>Capacity: {event.capacity}</p>
                  </div>
                  {visuals.description && (
                    <p className="mt-3 line-clamp-2 text-sm text-slate-600">{visuals.description}</p>
                  )}
                  <span className={`mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium shadow-sm transition-colors ${
                    isOpen
                      ? 'bg-brand-600 text-white group-hover:bg-brand-700'
                      : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                  }`}>
                    View Details
                  </span>
                </div>
              </Link>
            )
          })}
        </section>
      )}
    </div>
  )
}

export default ExploreEvents