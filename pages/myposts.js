import ThumbnailPost from '../components/ThumbnailPost'
import React, { useState, useContext, useEffect } from 'react'
import Layout from '../components/Layout.js'
import Link from 'next/link'
import {apiEndPoint} from '../lib/constant'
import { authContext } from '../lib/userContext'

let time = null
export default function myPost() {
  const [choose, setChoose] = useState('all')
  const [posts, setPosts] = useState([])

  let username = useContext(authContext)

  useEffect(async () => {
    const posts = await (await fetch(apiEndPoint+ '/pendings')).json()
    setPosts(posts)
  }, [username])

  return (
    <>
      <Layout username={username.displayName} admin={username.admin}>
        <div
          style={{ 'padding-left': '7.125rem', 'padding-right': '7.125rem' }}
        >
          <p style={{ fontFamily: 'Roboto-Regular', fontSize: '64px' }}>
            Your questions
          </p>
          <div
            class="mt-10 m-auto inline rounded-full h-40 w-40 flex items-center text-center justify-center font-semibold text-white"
            style={{ backgroundColor: '#AB3B61' }}
          >
            <p style={{ 'font-size': '6rem' }}>
              {username.displayName
                ? username.displayName[0].toUpperCase()
                : ''}
            </p>
          </div>
          <p
            class="my-2 m-auto text-center"
            style={{ fontFamily: 'Quark-Bold', fontSize: '36px' }}
          >
            {username.displayName}
          </p>

          <div
            class="border-solid border-b-2 border-gray-500 text-3xl relative mt-24"
            style={{ 'margin-right': '-7.125rem' }}
          >
            <div
              class="absolute bottom-0 "
              style={{
                'margin-bottom': '-2px',
                fontFamily: 'Quark-Bold',
                fontSize: '24px',
                width: '100%',
              }}
            >
              <div
                class={
                  'cursor-pointer select-none mr-16 inline mr-16 border-solid border-b-2 border-gray-' +
                  (choose == 'all' ? '800' : '500')
                }
                onClick={() => {
                  time = null
                  setChoose('all')
                }}
              >
                All
              </div>
              <div
                class={
                  'cursor-pointer select-none mr-16 inline mr-16 border-solid border-b-2 border-gray-' +
                  (choose == 'pending' ? '800' : '500')
                }
                onClick={() => {
                  time = null
                  setChoose('pending')
                }}
              >
                Pending
              </div>
              <div
                class={
                  'cursor-pointer select-none mr-16 inline mr-16 border-solid border-b-2 border-gray-' +
                  (choose == 'accepted' ? '800' : '500')
                }
                onClick={() => {
                  time = null
                  setChoose('accepted')
                }}
              >
                Approved
              </div>
              <div
                class={
                  'cursor-pointer select-none mr-16 inline mr-16 border-solid border-b-2 border-gray-' +
                  (choose == 'rejected' ? '800' : '500')
                }
                onClick={() => {
                  time = null
                  setChoose('rejected')
                }}
              >
                Rejected
              </div>
              <Link href="/draft">
                <a
                  class="absolute right-0 bg-white rounded-xl px-4"
                  style={{ height: 42, transform: 'translate(-50%,-50%)' }}
                >
                  <p
                    style={{
                      fontFamily: 'Priyati',
                      fontSize: 48,
                      color: '#158D1A',
                      transform: 'translate(0,-15%)',
                    }}
                  >
                    Write Post
                  </p>
                </a>
              </Link>
            </div>
          </div>

          <div class="my-8">
            {posts.map((data) => {
              return choose == data.status || choose == 'all' ? (
                <div>
                  {datediff(data)}
                  <ThumbnailPost
                    data={data}
                    status={data.status}
                    width="40vw"
                  ></ThumbnailPost>
                </div>
              ) : null
            })}
          </div>
        </div>
      </Layout>
    </>
  )
}

const isDateEqual = (a, b) => {
  return (
    a.getDate() == b.getDate() &&
    a.getMonth() == b.getMonth() &&
    a.getFullYear() == a.getFullYear()
  )
}

const datediff = (data) => {
  let tmp = new Date(data.time)
  if (time == null || !isDateEqual(tmp, time)) {
    time = new Date(data.time)
    let today = new Date()
    let yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    if (time.getDate() == today.getDate()) {
      return (
        <p
          class="mt-10 -mb-6"
          style={{ fontFamily: 'Quark-Bold', fontSize: 36 }}
        >
          Today
        </p>
      )
    } else if (time.getDate() == yesterday.getDate()) {
      return (
        <p
          class="mt-10 -mb-6"
          style={{ fontFamily: 'Quark-Bold', fontSize: 36 }}
        >
          Yesterday
        </p>
      )
    } else {
      return (
        <p
          class="mt-10 -mb-6"
          style={{ fontFamily: 'Quark-Bold', fontSize: 36 }}
        >
          {time.getDate() +
            '/' +
            String(parseInt(time.getMonth()) + 1) +
            '/' +
            time.getFullYear()}
        </p>
      )
    }
  }
  return ''
}
