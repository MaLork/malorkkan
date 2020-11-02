import MainPost from '../../components/postBlock/MainPost'
import Layout from '../../components/Layout'
import { useState, useContext, useEffect } from 'react'
import { authContext } from '../../lib/userContext'
import router from 'next/router'
import Share from '../../components/Share.js'
import { url, firebase, apiEndPoint } from '../../lib/constant.js'

const Post = ({ id }) => {
  const commentData = ''
  const [content, setContent] = useState('')
  const [display, setDisplay] = useState('hidden')
  const [postData, setPosts] = useState(null)
  const user = useContext(authContext)

  useEffect(async () => {
    if (user.displayName) {
      const tokenId = await firebase.auth().currentUser.getIdToken()
      const myPosts = user.displayName
        ? await (
            await fetch(apiEndPoint + `/pending/${id}`, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${tokenId}`,
              },
            })
          ).json()
        : null
      setPosts(myPosts)
    }
  }, [user])

  if (!postData) {
    return null
  }

  console.log(postData, user)

  return (
    <>
      <Share
        topic={postData.topic}
        link={url + '/post/' + postData.id}
        display={display}
        setDisplay={setDisplay}
      ></Share>
      <Layout
        username={user.displayName}
        admin={user.admin}
        className="flex flex-col h-screen"
      >
        <div
          className="container mx-auto flex content-center flow-root w-1/2 rounded py-2 mt-8 mb-16 pt-4"
          style={{ backgroundColor: '#FFF4EE' }}
        >
          <MainPost postData={postData} />
          <div className="mx-6">
            <button
              className="flex items-center text-white rounded px-2 py-1 mt-2"
              style={{ backgroundColor: '#123D6A' }}
              onClick={() => setDisplay('block')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="mr-1"
                style={{ width: 15, height: 15 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              <p className="font-medium text-sm">Share</p>
            </button>
            {user.admin ? (
              <div class="flex justify-center mt-8">
                <button
                  class="shadow-md focus:outline-none text-white rounded-xl mr-4"
                  style={{
                    backgroundColor: '#04EB84',
                    height: 60,
                    width: 220,
                    fontFamily: 'Quark-Bold',
                    fontSize: 30,
                  }}
                  onClick={() => update(id, true)}
                >
                  Approve
                </button>
                <button
                  class="shadow-md focus:outline-none text-white rounded-xl"
                  style={{
                    backgroundColor: '#AB3B61',
                    height: 60,
                    width: 220,
                    fontFamily: 'Quark-Bold',
                    fontSize: 30,
                  }}
                  onClick={() => update(id, false)}
                >
                  Reject
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      id: params.id,
    },
  }
}

const update = async (id, approve) => {
  const tokenId = await firebase.auth().currentUser.getIdToken()
  const res = await fetch(apiEndPoint + '/pending/' + id, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=UTF-8', // Indicates the content
      Authorization: `Bearer ${tokenId}`,
    },
    body: JSON.stringify({ approve }),
  })
  if (res.status === 200) {
    router.push(`/admin`)
  }
}

export default Post
