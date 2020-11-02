import Link from 'next/link'
import router from 'next/router'
import React, { useState } from 'react'
import { firebase } from '../lib/constant'

export default function Dropdown({ username, admin }) {
  const [display, setDisplay] = useState('hidden')
  return (
    <>
      <div class="absolute" style={{ minWidth: 130, right: 80, top: 50 }}>
        <div
          class="cursor-pointer select-none"
          onClick={() => {
            display == 'block' ? setDisplay('hidden') : setDisplay('block')
          }}
        >
          <div
            class={
              'absolute -mt-2  text-xl relative ' +
              (display == 'hidden' ? 'rounded-lg' : 'rounded-t-lg')
            }
            style={{
              height: '50px',
              backgroundColor: admin ? '#123D6A' : '#FFFFFF',
            }}
          >
            <div
              class="text-white w-8 h-8 text-center absolute"
              style={{
                backgroundColor: admin ? '#123D6A' : '#AB3B61',
                'border-radius': '50%',
                top: '50%',
                transform: 'translate(10px, -50%)',
              }}
            >
              {admin ? (
                <img
                  src="../images/crown.svg"
                  style={{ width: 25, transform: 'translate(15%,15%)' }}
                ></img>
              ) : (
                <p
                  class="text-2xl font-semibold"
                  style={{ 'line-height': '30px' }}
                >
                  {username[0].toUpperCase()}
                </p>
              )}
            </div>
            <p
              class="pl-12 pr-2 overflow-hidden"
              style={{
                color: admin ? '#FFFFFF' : '#000000',
                fontFamily: 'Quark-Bold',
                fontSize: '18px',
                transform: 'translate(0, 50%)',
              }}
            >
              {username}
            </p>
          </div>
        </div>
        <div>
          {admin ? (
            <Link href="/admin">
              <a class={'border-t-2 border-b-2 border-black ' + display}>
                <div
                  class="absolute text-xl relative"
                  style={{
                    height: '50px',
                    backgroundColor: admin ? '#123D6A' : '#FFFFFF',
                  }}
                >
                  <div
                    class="w-8 h-8 absolute"
                    style={{ top: '50%', transform: 'translate(13px, -50%)' }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="yellow"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                  </div>
                  <p
                    class="pl-12 pr-2"
                    style={{
                      color: admin ? '#FFFFFF' : '#000000',
                      fontFamily: 'Quark-Bold',
                      fontSize: '18px',
                      transform: 'translate(0, 50%)',
                    }}
                  >
                    Admin
                  </p>
                </div>
              </a>
            </Link>
          ) : null}
        </div>
        <Link href="/myposts">
          <a class={'border-t-2 border-b-2 border-black ' + display}>
            <div
              class="absolute text-xl relative"
              style={{
                height: '50px',
                backgroundColor: admin ? '#123D6A' : '#FFFFFF',
              }}
            >
              <div
                class="w-8 h-8 absolute"
                style={{ top: '50%', transform: 'translate(13px, -50%)' }}
              >
                <img
                  src="../images/mypost.svg"
                  style={{ width: 25, transform: 'translate(15%,15%)' }}
                ></img>
              </div>
              <p
                class="pl-12 pr-2"
                style={{
                  color: admin ? '#FFFFFF' : '#000000',
                  fontFamily: 'Quark-Bold',
                  fontSize: '18px',
                  transform: 'translate(0, 50%)',
                }}
              >
                My post
              </p>
            </div>
          </a>
        </Link>
        <div
          class={'cursor-pointer select-none ' + display}
          onClick={async () => {
            await firebase
              .auth()
              .signOut()
              .then(() => {
                console.log('Sign out Successful')
              })
              .catch((error) => {
                console.log(`Error: ${error.message}`)
              })
          }}
        >
          <div
            class="absolute text-xl relative rounded-b-lg"
            style={{
              height: '50px',
              backgroundColor: admin ? '#123D6A' : '#FFFFFF',
            }}
          >
            <div
              class="w-8 h-8 absolute"
              style={{ top: '50%', transform: 'translate(13px, -50%)' }}
            >
              <img
                src="../images/signout.svg"
                style={{ width: 25, transform: 'translate(15%,15%)' }}
              ></img>
            </div>
            <p
              class="pl-12 pr-2"
              style={{
                color: admin ? '#FFFFFF' : '#000000',
                fontFamily: 'Quark-Bold',
                fontSize: '18px',
                transform: 'translate(0, 50%)',
              }}
            >
              Sign Out
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
