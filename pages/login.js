import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import router from 'next/router'
import Head from 'next/head'
import Layout from '../components/Layout'
import { loginUser } from '../lib/userFunction'
import { FirebaseContext } from '../lib/firebaseContext'
import useFirebaseAuthentication from '../lib/useFirebaseAuthentication'

export default function login() {
  let [formState, setFormState] = useState({
    email: '',
    password: '',
  })

  let [loginFailed, setLoginFailed] = useState('')

  const firebase = useContext(FirebaseContext)
  const authUser = useFirebaseAuthentication(firebase)

  if (authUser) {
    router.push('/', undefined, { shallow: true })
    return null
  }

  return (
    <div className="flex flex-col h-screen">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout login />
      <div className="flex justify-center items-center flex-col text-xl h-full">
        <p className="items-center mt-2">{loginFailed}</p>
        <p className="items-center mt-2 mb-4"> Login</p>
        <form
          onSubmit={async (e) => {
            e.preventDefault()

            const status = await loginUser(formState.email, formState.password)

            if (status === 'Success') {
              router.push('/', undefined, { shallow: true })
              return
            }

            setLoginFailed(status.message)
          }}
        >
          <div>
            <div>
              <p htmlFor="email" className="mb-2">
                Email:{' '}
              </p>
              <input
                type="text"
                className="mb-2"
                onChange={(event) =>
                  setFormState({
                    email: event.target.value,
                    password: formState.password,
                  })
                }
              ></input>
            </div>
            <div>
              <p htmlFor="password" className="mb-2">
                Password:{' '}
              </p>
              <input
                type="password"
                onChange={(event) =>
                  setFormState({
                    email: formState.email,
                    password: event.target.value,
                  })
                }
              ></input>
            </div>
          </div>
          <div className="flex">
            <div className="flex pr-4 py-2">
              <p className="pr-2">Forget password?</p>
              <Link href="/contacts">
                <a className="text-blue-600 hover:underline pr-32">
                  Contact Us
                </a>
              </Link>
            </div>
            <div>
              <Link href="/register">
                <a className="hover:underline pr-3">Register</a>
              </Link>
              <button
                type="submit"
                value="Submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold rounded px-4 py-2"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

// export async function getStaticProps() {
//   let user = await getUserData()
//   return {
//     props: {
//       user,
//     },
//   }
// }
