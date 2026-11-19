import { createContext, useContext } from 'react'

export const USER_STORAGE_KEY = 'campusconnect-user-id'

export const USERS = [
  { label: 'Student 1', id: '22222222-2222-2222-2222-222222222222' },
  { label: 'Student 2', id: '33333333-3333-3333-3333-333333333333' },
  { label: 'Organizer', id: '11111111-1111-1111-1111-111111111111' },
]

export const UserContext = createContext(null)

export function useUser() {
  return useContext(UserContext)
}