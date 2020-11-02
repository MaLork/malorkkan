import Layout from '../../components/Layout.js'
import style from '../../styles/register.module.css'
import React, { useState } from 'react'
import router from 'next/router'
import { apiEndPoint, firebase } from '../../lib/constant'
export default function register() {
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  return (
    <Layout login>
      <div
        class="m-auto relative pb-16"
        style={{ width: '40%', fontFamily: 'Quark-Bold', fontSize: '36px' }}
      >
        <p
          class="mt-6 mb-2"
          style={{ fontFamily: 'Roboto-Regular', fontSize: '60px' }}
        >
          Register
        </p>
        <p>Email</p>
        <input
          type="text"
          className={style.input}
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <p class="inline">Password</p>
        <p class="inline ml-2 " style={{ fontSize: '18px', color: '#8E8E8E' }}>
          need at least 6 characters
        </p>
        <input
          type="password"
          className={style.input}
          onChange={(event) => setPass(event.target.value)}
        ></input>
        <p>Confirm password</p>
        <input
          type="password"
          className={style.input}
          onChange={(event) => setConfirmPass(event.target.value)}
        ></input>
        <p>Display name</p>
        <input
          type="text"
          className={style.input}
          onChange={(event) => setUser(event.target.value)}
        ></input>
        <div class="absolute bottom-0 right-0">
          <p
            class="inline"
            style={{
              color: '#AB3B61',
              fontFamily: 'Lato-Medium',
              fontSize: '18px',
            }}
          >
            {errorMessage}
          </p>
          <div
            onClick={() => {
              const res = validate(
                user,
                setUser,
                email,
                setEmail,
                pass,
                setPass,
                confirmPass,
                setConfirmPass,
                errorMessage,
                setErrorMessage
              )
              if (res === 'Success') {
                router.push('/register/complete', undefined, { shallow: true })
              }
            }}
            class="ml-4 inline-block rounded-lg"
            style={{ backgroundColor: '#52C587' }}
          >
            <p
              class="text-center px-2 text-white select-none cursor-pointer"
              style={{ fontFamily: 'Mitr-Light', fontSize: '24px' }}
            >
              Submit
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

const validate = async (
  user,
  setUser,
  email,
  setEmail,
  pass,
  setPass,
  confirmPass,
  setConfirmPass,
  errorMessage,
  setErrorMessage
) => {
  if (email == '') {
    setErrorMessage('Enter email')
  } else if (pass == '') {
    setErrorMessage('Enter password')
  } else if (confirmPass == '') {
    setErrorMessage('Enter confirm password')
  } else if (user == '') {
    setErrorMessage('Enter Display name')
  } else if (pass.length < 6) {
    setErrorMessage('Password must be at least 6 characters')
  } else if (pass != confirmPass) {
    setErrorMessage("Password didn't match")
  } else if (!isEmailValid(email)) {
    setErrorMessage("Email doesn't valid")
  } else {
    setErrorMessage('')
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then((response) => {
        return response.user
      })
      .catch((error) => {
        setErrorMessage(error.message)
        return null
      })
    if (res) {
      res.updateProfile({
        displayName: user,
      })
      const authToken = await firebase.auth().currentUser.getIdToken()
      const body = {
        user,
      }
      await fetch(`${apiEndPoint}/user/signup`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      })
      await firebase.auth().signOut()
      return 'Success'
    } else {
      return 'Error'
    }
  }
}
const isEmailValid = (email) => {
  if (email.indexOf('@') == -1) {
    return 0
  }
  if (email.indexOf('.') == -1) {
    return 0
  }
  if (email.indexOf('@') + 1 < email.indexOf('.')) {
    return 1
  }
  return 0
}
