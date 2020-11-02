import ThumbnailPost from '../components/ThumbnailPost'
import Layout from '../components/Layout.js'
import { apiEndPoint, firebase } from '../lib/constant'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../lib/userContext'

export async function getStaticProps() {
  // const posts = await (await fetch("https://asia-east2-malork-kantoer.cloudfunctions.net/posts")).json()
  const post = await (
    await fetch(apiEndPoint + '/posts?page=1', {
      headers: {
        'Content-type': 'application/json; charset=UTF-8', // Indicates the content
      },
    })
  ).json()

  return {
    props: {
      post,
    },
  }
}

export default function myPost({ post }) {
  let username = useContext(authContext)

  const [myPosts, setMyPosts] = useState(null)

  useEffect(async () => {
    if (username.displayName) {
      const tokenId = await firebase.auth().currentUser.getIdToken()
      const myPosts = username.displayName
        ? await (
            await fetch(apiEndPoint + '/pendings', {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${tokenId}`,
              },
            })
          ).json()
        : null
      setMyPosts(myPosts)
    }
  }, [username])

  let accepted = []
  let pending = []
  let rejected = []

  if (username.displayName !== null && myPosts !== null) {
    myPosts.map((data) => {
      if (data.status == 'accepted' && accepted.length < 2) {
        accepted.push(data)
      } else if (data.status == 'pending' && pending.length < 2) {
        pending.push(data)
      } else if (data.status == 'rejected' && rejected.length < 2) {
        rejected.push(data)
      }
    })
  }

  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState(post)

  return (
    <Layout username={username.displayName} admin={username.admin}>
      <img src="/images/homepage.png"></img>
      <div class="flex">
        <div class="inline mb-4">
          <div class="my-8" style={{ 'padding-left': '7.125rem' }}>
            {posts.map((data) => (
              <ThumbnailPost
                data={data}
                width={username ? '40vw' : '80vw'}
              ></ThumbnailPost>
            ))}
          </div>
          <div class="-mt-8 mr-12 float-right">
            {page == 1 ? null : (
              <button
                class="focus:outline-none inline"
                onClick={() => {
                  setPage(page - 1)
                  changePage(-1, page, setPage, setPosts, posts)
                }}
              >
                <img
                  src="../images/left-arrow.svg"
                  style={{ height: 15 }}
                ></img>
              </button>
            )}
            <p class="inline mx-2 text-xl">{page}</p>
            {posts[0].id <= 10 ? null : (
              <button
                class="focus:outline-none inline"
                onClick={() => {
                  setPage(page + 1)
                  changePage(1, page, setPage, setPosts, posts)
                }}
              >
                <img
                  src="../images/right-arrow.svg"
                  style={{ height: 15 }}
                ></img>
              </button>
            )}
          </div>
        </div>
        {username.displayName ? (
          <div class="inline mt-4">
            <Link href="/draft">
              <a
                class="absolute right-0 bg-white rounded-xl px-4"
                style={{ height: 42, transform: 'translate(-60px,32px)' }}
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
            <div class="my-8 -ml-16" style={{ 'padding-left': '7.125rem' }}>
              <div
                class="border-b-2 border-black"
                style={{ fontFamily: 'Quark-Bold', fontSize: 36 }}
              >
                Pending List
              </div>

              {pending.length > 0 ? (
                <>
                  {pending.map((data) => (
                    <ThumbnailPost
                      data={data}
                      width="40vw"
                      status={data.status}
                    ></ThumbnailPost>
                  ))}

                  <Link href="/myposts">
                    <a
                      class="-mt-4 float-right"
                      style={{
                        fontFamily: 'Quark-Bold',
                        fontSize: 24,
                        color: '#8E8E8E',
                      }}
                    >
                      more...
                    </a>
                  </Link>
                </>
              ) : (
                <p
                  style={{
                    color: '#8E8E8E',
                    fontFamily: 'Lato-Medium',
                    fontSize: '18px',
                  }}
                >
                  Nothing here... Write some new post!
                </p>
              )}
            </div>

            <div class="my-8 -ml-16" style={{ 'padding-left': '7.125rem' }}>
              <div
                class="border-b-2 border-black"
                style={{ fontFamily: 'Quark-Bold', fontSize: 36 }}
              >
                Approved List
              </div>
              {accepted.length > 0 ? (
                <>
                  {accepted.map((data) => (
                    <ThumbnailPost
                      data={data}
                      width="40vw"
                      status={data.status}
                    ></ThumbnailPost>
                  ))}

                  <Link href="/myposts">
                    <a
                      class="-mt-4 float-right"
                      style={{
                        fontFamily: 'Quark-Bold',
                        fontSize: 24,
                        color: '#8E8E8E',
                      }}
                    >
                      more...
                    </a>
                  </Link>
                </>
              ) : (
                <p
                  style={{
                    color: '#8E8E8E',
                    fontFamily: 'Lato-Medium',
                    fontSize: '18px',
                  }}
                >
                  Please wait for admin approval
                </p>
              )}
            </div>

            <div class="my-8 -ml-16" style={{ 'padding-left': '7.125rem' }}>
              <div
                class="border-b-2 border-black"
                style={{ fontFamily: 'Quark-Bold', fontSize: 36 }}
              >
                Rejected List
              </div>
              {rejected.length > 0 ? (
                <>
                  {rejected.map((data) => (
                    <ThumbnailPost
                      data={data}
                      width="40vw"
                      status={data.status}
                    ></ThumbnailPost>
                  ))}

                  <Link href="/myposts">
                    <a
                      class="-mt-4 float-right"
                      style={{
                        fontFamily: 'Quark-Bold',
                        fontSize: 24,
                        color: '#8E8E8E',
                      }}
                    >
                      more...
                    </a>
                  </Link>
                </>
              ) : (
                <p
                  style={{
                    color: '#8E8E8E',
                    fontFamily: 'Lato-Medium',
                    fontSize: '18px',
                  }}
                >
                  Nothing have been rejected :)
                </p>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  )
}

async function changePage(x, page, setPage, setPosts, posts) {
  const res = await fetch(apiEndPoint + '/posts?page=' + (page + x), {
    headers: {
      'Content-type': 'application/json; charset=UTF-8', // Indicates the content
    },
  })
  if (res.status == 200) {
    const data = await res.json()
    setPosts(data)
    setPage(page + x)
  }
}
