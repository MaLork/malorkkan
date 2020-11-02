import { createContext, useEffect, useState } from 'react'
import { apiEndPoint, firebase } from './constant'

export const authContext = createContext()

export function ProvideAuth({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useProvideAuth = () => {
  const [user, setUser] = useState({
    displayName: null,
    admin: false,
  })

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const res = await firebase
          .auth()
          .currentUser.getIdToken(true)
          .then(async (idToken) => {
            const config = {
              methods: 'GET',
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            }
            return await fetch(`${apiEndPoint}/user/signin`, config)
          })
        const userData = await res.json()
        setUser({
          displayName: userData.user,
          admin: userData.admin,
        })
      } else {
        setUser({
          displayName: '',
          admin: false,
        })
      }
    })
    return () => unsubscribe()
  }, [])

  return user
}
