import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiRequest } from '../api.js'
import { getEventVisuals } from '../data/eventVisuals.js'
import { useUser } from '../userContext.js'

function EventDetails() {
  const { id } = useParams()
  const { currentUser } = useUser()
  const visuals = getEventVisuals(id)
  const selectedUserId = useRef(currentUser.id)

  const [event, setEvent] = useState(null)
  const [isRegistered, setIsRegistered] = useState(false)
  const [registrationState, setRegistrationState] = useState('idle')
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [loadError, setLoadError] = useState(null)
  const [actionError, setActionError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let isCurrentRequest = true
    selectedUserId.current = currentUser.id

    async function loadDetails() {
      setIsLoading(true)
      setNotFound(false)
      setLoadError(null)
      setActionError(null)
      setRegistrationState('idle')

      try {
        const [eventDetails, registrations] = await Promise.all([
          apiRequest(`/events/${id}`),
          apiRequest('/me/registrations'),
        ])

        if (isCurrentRequest) {
          setEvent(eventDetails)
          setIsRegistered(
            registrations.some((registration) => registration.events?.id === id),
          )
        }
      } catch (requestError) {
        if (isCurrentRequest) {
          if (requestError.message === 'Event not found') {
            setNotFound(true)
          } else {
            setLoadError(requestError.message || 'Please try again.')
          }
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoading(false)
        }
      }
    }

    loadDetails()
    return () => {
      isCurrentRequest = false
    }
  }, [id, currentUser.id, retryCount])

  async function refreshEvent(userId) {
    try {
      const updatedEvent = await apiRequest(`/events/${id}`)
      if (selectedUserId.current === userId) {
        setEvent(updatedEvent)
      }
    } catch {
      if (selectedUserId.current === userId) {
        setActionError('Your registration was saved, but we could not refresh the seat count.')
      }
    }
  }

  async function registerForEvent() {
    const userId = currentUser.id
    setRegistrationState('registering')
    setActionError(null)

    try {
      await apiRequest('/registrations', {
        method: 'POST',
        body: JSON.stringify({ event_id: id }),
      })

      if (selectedUserId.current !== userId) {
        return
      }

      setIsRegistered(true)
      setRegistrationState('registered')
      await refreshEvent(userId)
    } catch (requestError) {
      if (selectedUserId.current !== userId) {
        return
      }

      if (requestError.message === 'DUPLICATE_REGISTRATION') {
        setIsRegistered(true)
        setRegistrationState('registered')
        await refreshEvent(userId)
      } else if (requestError.message === 'EVENT_FULL') {
        setRegistrationState('full')
        try {
          const updatedEvent = await apiRequest(`/events/${id}`)
          if (selectedUserId.current === userId) {
            setEvent(updatedEvent)
          }
        } catch {
          // Keep the full state from the registration response.
        }
      } else {
        setRegistrationState('idle')
        setActionError("We couldn't complete your registration. Please try again.")
      }
    }
  }

  const backLink = (
    <Link
      to="/"
      className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-brand-600"
    >
      <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M10 19 3 12l7-7M3 12h18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
      Back to Explore Events
    </Link>
  )

  if (isLoading) {
    return (
      <>
        {backLink}
        <div aria-label="Loading event" aria-busy="true" className="grid animate-pulse grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-8">
            <div className="h-10 w-2/3 rounded bg-slate-200" />
            <div className="h-6 w-1/4 rounded bg-slate-100" />
            <div className="h-5 w-1/3 rounded bg-slate-100" />
          </div>
          <div className="h-56 rounded-2xl border border-slate-200 bg-white lg:col-span-4" />
        </div>
      </>
    )
  }

  if (notFound) {
    return (
      <section>
        <h1 className="text-2xl font-bold text-slate-900">Event not found</h1>
        <div className="mt-5">{backLink}</div>
      </section>
    )
  }

  if (loadError || !event) {
    return (
      <section role="alert" className="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-bold text-slate-900">We couldn’t load this event</h1>
        <p className="mt-2 text-sm text-slate-600">{loadError || 'Please try again.'}</p>
        <button
          className="mt-5 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          type="button"
          onClick={() => setRetryCount((count) => count + 1)}
        >
          Retry
        </button>
        <div className="mt-5">{backLink}</div>
      </section>
    )
  }

  const isClosed = event.status === 'closed'
  const isFull = Number(event.seats_left) <= 0 || registrationState === 'full'
  const buttonLabel = registrationState === 'registering'
    ? 'Registering…'
    : isRegistered
      ? 'Registered ✓'
      : isClosed
        ? 'Registration Closed'
        : isFull
          ? 'Event Full'
          : 'Register Now'
  const isButtonDisabled = registrationState === 'registering'
    || isRegistered
    || isClosed
    || isFull

  return (
    <>
      {backLink}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <section className="space-y-5 lg:col-span-8">
          <div className="relative h-64 overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 shadow-sm sm:h-80">
            {visuals.image ? (
              <img src={visuals.image} alt={`${event.title} event`} className="size-full object-cover" />
            ) : (
              <div className="flex size-full items-center justify-center text-7xl font-bold text-white">
                {event.title.trim().charAt(0).toUpperCase()}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-brand-700 shadow-sm backdrop-blur">
              {visuals.tag}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {event.title}
            </h1>
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
              isClosed
                ? 'border-slate-200 bg-slate-100 text-slate-600'
                : 'border-emerald-200 bg-emerald-50 text-emerald-700'
            }`}>
              <span className={`size-1.5 rounded-full ${isClosed ? 'bg-slate-400' : 'bg-emerald-500'}`} />
              {isClosed ? 'Closed' : 'Open'}
            </span>
          </div>
          <p className="text-sm font-medium text-slate-600">Capacity: {event.capacity}</p>
          {(visuals.date || visuals.venue) && (
            <div className="grid grid-cols-1 gap-3.5 rounded-xl border border-slate-200/80 bg-white p-4 text-sm shadow-xs sm:grid-cols-2">
              {visuals.date && (
                <div className="flex items-center gap-3 text-slate-700">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-brand-600">
                    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path d="M8 3v4m8-4v4M4 10h16M5 5h14a1 1 0 0 1 1 1v13H4V6a1 1 0 0 1 1-1Z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span>{visuals.date}</span>
                </div>
              )}
              {visuals.venue && (
                <div className="flex items-center gap-3 text-slate-700">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-brand-600">
                    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  </span>
                  <span>{visuals.venue}</span>
                </div>
              )}
            </div>
          )}
          {visuals.description && (
            <section className="space-y-2 pt-2">
              <h2 className="text-lg font-bold text-slate-900">About this event</h2>
              <p className="text-base leading-relaxed text-slate-600">{visuals.description}</p>
            </section>
          )}
        </section>

        <aside className="lg:col-span-4">
          <div className="space-y-6 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
            <p className="text-lg font-bold text-slate-900">
              {event.seats_left} of {event.capacity} seats left
            </p>
            {isRegistered && (
              <p className="text-center text-sm font-semibold text-emerald-700" role="status">
                You&apos;re registered!
              </p>
            )}
            <button
              className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-center font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${
                isButtonDisabled
                  ? 'cursor-not-allowed bg-slate-200 text-slate-500'
                  : 'bg-brand-600 text-white shadow-md shadow-brand-500/20 hover:bg-brand-700'
              }`}
              type="button"
              disabled={isButtonDisabled}
              onClick={registerForEvent}
            >
              {buttonLabel}
              {!isButtonDisabled && (
                <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M14 5l7 7m0 0-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                </svg>
              )}
            </button>
            {actionError && <p className="text-center text-sm text-rose-700" role="alert">{actionError}</p>}
          </div>
        </aside>
      </div>
    </>
  )
}

export default EventDetails