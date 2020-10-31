import ThumbnailPost from '../components/ThumbnailPost'
import Layout from '../components/Layout.js'
import Const from '../lib/constants'
import Link from 'next/link'
import React, { useState } from 'react'
export async function getStaticProps() {
  // const posts = await (await fetch("https://asia-east2-malork-kantoer.cloudfunctions.net/posts")).json()
  const post = await (
    await fetch(Const.api + '/posts?page=1', {
      headers: {
        'Content-type': 'application/json; charset=UTF-8', // Indicates the content
      },
    })
  ).json()
  const username = 'Test'
  const myPosts = username
    ? await (await fetch(Const.api + '/pendings')).json()
    : null
  let accepted = []
  let pending = []
  let rejected = []
  if (username != null) {
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

  return {
    props: {
      post,
      myPosts,
      username,
      accepted,
      pending,
      rejected,
    },
  }
}
export default function myPost({
  post,
  myPosts,
  username,
  pending,
  rejected,
  accepted,
}) {
  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState(post)
  return (
    <Layout username={username}>
      <img src="/images/SpaceWallpaper.jpg"></img>
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
                  console.log(page)
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
        {username ? (
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
            {pending.length > 0 ? (
              <div class="my-8 -ml-16" style={{ 'padding-left': '7.125rem' }}>
                <div
                  class="border-b-2 border-black"
                  style={{ fontFamily: 'Quark-Bold', fontSize: 36 }}
                >
                  Pending List
                </div>
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
              </div>
            ) : null}

            {accepted.length > 0 ? (
              <div class="my-8 -ml-16" style={{ 'padding-left': '7.125rem' }}>
                <div
                  class="border-b-2 border-black"
                  style={{ fontFamily: 'Quark-Bold', fontSize: 36 }}
                >
                  Approved List
                </div>
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
              </div>
            ) : null}

            {rejected.length > 0 ? (
              <div class="my-8 -ml-16" style={{ 'padding-left': '7.125rem' }}>
                <div
                  class="border-b-2 border-black"
                  style={{ fontFamily: 'Quark-Bold', fontSize: 36 }}
                >
                  Rejected List
                </div>
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
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </Layout>
  )
}

async function changePage(x, page, setPage, setPosts, posts) {
  console.log(page)
  const res = await fetch(Const.api + '/posts?page=' + (page + x), {
    headers: {
      'Content-type': 'application/json; charset=UTF-8', // Indicates the content
    },
  })
  if (res.status == 200) {
    const data = await res.json()
    console.log(data)
    setPosts(data)
    setPage(page + x)
  }
  console.log(posts)
}
