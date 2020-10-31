import { useState, useEffect } from 'react'

const useFirebaseAuthentication = (firebase) => {
  const [authUser, setAuthUser] = useState('')

  useEffect(() => {
    const unlisten = firebase.auth().onAuthStateChanged((authUser) => {
      authUser ? setAuthUser(authUser) : setAuthUser('')
    })
    return () => {
      unlisten()
    }
  })

  return authUser
}

export default useFirebaseAuthentication