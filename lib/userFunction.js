import { firebase } from './constant'
import { useState } from 'react'

async function registerUser(handle, email, password) {
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message
      console.log(errorCode)
      console.log(errorMessage)
    })
  let user = firebase.auth().currentUser
  await user.updateProfile({
    displayName: handle,
  })
}

function loginUser(email, password) {
  const result = firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      return 'Success'
    })
    .catch((error) => {
      console.log(`Error: ${error.errorMessage}`)
      return error
    })
  return result
}

function logoutUser() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('Sign out Successful')
    })
    .catch((error) => {
      console.log(`Error: ${error.message}`)
    })
}

export { registerUser, loginUser, logoutUser }
