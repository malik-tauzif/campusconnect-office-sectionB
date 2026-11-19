import { NavLink, Link } from 'react-router-dom'
import { useUser } from './userContext.js'

function Navbar() {
  const { users, currentUser, setUserId } = useUser()

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white shadow-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2.5 text-slate-900">
          <span className="flex size-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm shadow-brand-500/30 transition-colors hover:bg-brand-700">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.8">
              <path d="m2.5 8 9.5-5 9.5 5-9.5 5-9.5-5Z" strokeLinejoin="round" />
              <path d="M6 10v5.5c3.5 3 8.5 3 12 0V10M21.5 8v6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-xl font-bold tracking-tight">Campus<span className="text-brand-600">Connect</span></span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `rounded-lg px-3.5 py-2 text-sm transition-colors ${isActive ? 'bg-brand-50 font-semibold text-brand-700' : 'font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`
            }
          >
            Explore
          </NavLink>
          <NavLink
            to="/my-registrations"
            className={({ isActive }) =>
              `rounded-lg px-3.5 py-2 text-sm transition-colors ${isActive ? 'bg-brand-50 font-semibold text-brand-700' : 'font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`
            }
          >
            My Registrations
          </NavLink>
        </nav>

        <label className="flex min-w-0 items-center gap-2 rounded-full border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-sm text-slate-800 transition-colors hover:bg-slate-100">
          <span className="hidden text-slate-500 sm:inline">User</span>
          <select
            aria-label="Choose user"
            className="max-w-32 cursor-pointer border-0 bg-transparent py-0 pr-5 text-sm font-semibold text-slate-800 focus:ring-0 sm:max-w-none"
            value={currentUser.id}
            onChange={(event) => setUserId(event.target.value)}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.label}</option>
            ))}
          </select>
        </label>
      </div>
    </header>
  )
}

export default Navbar