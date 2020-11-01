import { createContext, useEffect, useState } from 'react'
import { firebase } from './constant'

export const authContext = createContext()

export function ProvideAuth({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useProvideAuth = () => {
  const [user, setUser] = useState('')

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      }
    })
    return () => unsubscribe()
  }, [])

  return { user }
}
