import { firebase } from './constant'
import { createContext } from 'react'

export const FirebaseContext = createContext()
export const FirebaseProvider = (props) => (
  <FirebaseContext.Provider value={firebase}>
    {props.children}
  </FirebaseContext.Provider>
)
