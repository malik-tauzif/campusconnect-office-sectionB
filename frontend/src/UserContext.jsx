import { useEffect, useState } from 'react'
import { USER_STORAGE_KEY, USERS, UserContext } from './userContext.js'

export function UserProvider({ children }) {
  const [userId, setUserId] = useState(() => {
    const storedId = localStorage.getItem(USER_STORAGE_KEY)
    return USERS.some((user) => user.id === storedId) ? storedId : USERS[0].id
  })

  useEffect(() => {
    localStorage.setItem(USER_STORAGE_KEY, userId)
  }, [userId])

  function changeUser(nextUserId) {
    if (!USERS.some((user) => user.id === nextUserId)) {
      return
    }

    localStorage.setItem(USER_STORAGE_KEY, nextUserId)
    setUserId(nextUserId)
  }

  const currentUser = USERS.find((user) => user.id === userId)

  return (
    <UserContext.Provider value={{ users: USERS, currentUser, setUserId: changeUser }}>
      {children}
    </UserContext.Provider>
  )
}