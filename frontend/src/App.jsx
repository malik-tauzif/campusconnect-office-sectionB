import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import ExploreEvents from './pages/ExploreEvents.jsx'
import EventDetails from './pages/EventDetails.jsx'
import MyRegistrations from './pages/MyRegistrations.jsx'
import { UserProvider } from './UserContext.jsx'

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <div className="min-h-screen bg-canvas font-sans text-slate-800">
          <Navbar />
          <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<ExploreEvents />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/my-registrations" element={<MyRegistrations />} />
            </Routes>
          </main>
        </div>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
