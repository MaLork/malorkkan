import { useEffect } from 'react'
import Link from 'next/link'
import router from 'next/router'

export default function login({ userData }) {
  if (userData) {
    useEffect(() => {
      router.push('/')
    })
    return null
  }

  useEffect(() => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  })

  return (
    <>
      <div className="flex justify-center items-center my-4">
        <h1 className="text-2xl">Ma-lork together!</h1>
      </div>
      <hr />{' '}
      <div
        className="flex justify-center items-center flex-col text-xl"
        style={{
          height: '100vh',
          height: 'calc(var(--vh, 1vh) * 100)',
        }}
      >
        <div>
          <div>
            <div>
              <p>Email: </p>
              <input type="text"></input>
            </div>
            <div>
              <p>Password: </p>
              <input type="password"></input>
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
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold rounded px-4 py-2">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
