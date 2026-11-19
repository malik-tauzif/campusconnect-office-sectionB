# CampusConnect – Frontend Brief (for the AI developer)

## Goal
Build the React frontend for CampusConnect, a campus event registration app.
Stack: React (Vite, already created in this folder) + Tailwind CSS v4 + React Router.

## Golden rules
1. The frontend talks ONLY to our FastAPI backend. NEVER use Supabase in the frontend. No database keys here.
2. Build ONLY what is in this brief. Real data (title, capacity, status, seats, registrations) comes ONLY from the API. Presentation extras (photo, tag, date, time, venue, short description) come ONLY from src/data/eventVisuals.js, which is sample demo data. Do not add login pages, payments, dark mode, notifications or emails.
3. Keep code simple and beginner-readable, with short comments.
4. Visual design: the screens' code.html files in ../design are the source of truth (brand violet palette, Inter font, slate greys, background #F8F9FC). Ignore the colours and fonts in DESIGN.md where they differ.

## Backend API
Base URL comes from env var VITE_API_URL (local: http://localhost:8001/api). Put it in frontend/.env.
Every request sends header:  x-user-id: <current user's id>

| Method | Path | Returns | Errors |
|---|---|---|---|
| GET | /events?search=<text> | list of events | – |
| GET | /events/{id} | one event + booked_seats + seats_left | 404 Event not found |
| POST | /registrations  body {"event_id": "..."} | 201 {id, event_id, status:"REGISTERED"} | 401, 400 closed, 404, 409 DUPLICATE_REGISTRATION, 409 EVENT_FULL |
| GET | /me/registrations | list: {id, created_at, events:{id,title,capacity,status}} | 401 |

Event fields: id, title, capacity, status ("open" | "closed"), organizer_id.
There are NO dates, locations, images or descriptions in the API. Do not invent them.
Errors come back as JSON: {"detail": "<message>"}.

## Users (simulated login – a user switcher in the navbar)
| Label | id |
|---|---|
| Student 1 | 22222222-2222-2222-2222-222222222222 |
| Student 2 | 33333333-3333-3333-3333-333333333333 |
| Organizer | 11111111-1111-1111-1111-111111111111 |
Default: Student 1. Remember the choice in localStorage.

## Screens (3) – routes
1. Explore Events  "/"  → design/explore_events
   Search box, event cards (title, capacity, Open/Closed badge), click card → details.
2. Event Details  "/events/:id"  → design/event_details
   Title, status, capacity, seats left, Register button.
   Ignore the "Instant confirmation sent to…" line in the design.
3. My Registrations  "/my-registrations"  → design/my_registrations
   List of the current user's registered events with a "Registered" badge.

## States every screen must handle
- Loading (spinner or skeleton)
- Empty (e.g. "No registrations yet" + button to Explore)
- Error (friendly message, not a crash)
Register button states:
- Register (open, seats available) → shows "Registering…" while waiting
- Registered ✓ (after 201, or on 409 DUPLICATE_REGISTRATION)
- Event Full (seats_left = 0, or on 409 EVENT_FULL)
- Closed (status = closed) – button disabled
After registering, refresh seats left.

## Environment
The backend runs on port 8001 and the frontend dev server is already running on port 5173. Never start another dev server. Use http://localhost:5173 to check your work.