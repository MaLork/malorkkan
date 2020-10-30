import {
  retrievePostData,
  getPostById,
  getAllPathId,
} from '../../lib/getData/retrievePostData'
import { getCommentById } from '../../lib/getData/retrieveCommentData'
import { postComment } from '../../lib/sendData/sendCommentData'
import MainPost from '../../components/postBlock/MainPost'
import CommentPost from '../../components/postBlock/CommentPost'
import Layout from '../../components/Layout'
import { useContext, useState } from 'react'
import { FirebaseContext } from '../../lib/firebaseContext'
import useFirebaseAuthentication from '../../lib/useFirebaseAuthentication'
import router from 'next/router'

const Post = ({ postData, commentData, id }) => {
  const commentSize = commentData.comments.length
  const [content, setContent] = useState('')

  const firebase = useContext(FirebaseContext)
  const authUser = useFirebaseAuthentication(firebase)

  return (
    <>
      <Layout username={authUser.email} className="flex flex-col h-screen">
        <div
          className="container mx-auto flex content-center flow-root w-1/2 rounded py-2 mt-8 mb-16 pt-4"
          style={{ backgroundColor: '#FFF4EE' }}
        >
          <MainPost postData={postData} />
          <div className="mx-6">
            <button
              className="flex items-center text-white rounded px-2 py-1 mt-2"
              style={{ backgroundColor: '#123D6A' }}
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
            <p
              className="mt-1"
              style={{ fontFamily: 'Lato', fontStyle: 'normal' }}
            >
              {commentSize
                ? `${commentSize} Answer${commentSize > 1 ? 's' : ''}`
                : 'No Answer'}
            </p>
          </div>
          <CommentPost commentData={commentData.comments} />
          <div className="px-6">
            <h1 className="mt-2 mb-2 text-x font-bold">Your Answer</h1>
            <textarea
              className="resize-none w-full px-2 py-2 h-auto"
              placeholder="Enter your answer"
              rows="5"
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="flex flex-row-reverse mx-6 my-2">
            <button
              type="submit"
              className="rounded bg-green-500 hover:bg-green-700 text-white bold px-4 py-1"
              onClick={async () => {
                if (!authUser) {
                  alert('Please Login first')
                  return
                }
                //Temporary authUser.email
                const res = await postComment(authUser.email, content, id)
                if (res.status === 200) {
                  router.push(`/post/${id}`, undefined)
                  setContent('')
                }
                console.log(res)
              }}
            >
              {' '}
              Comment
            </button>
          </div>
        </div>
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  const allPath = await retrievePostData()
  const paths = getAllPathId(allPath)
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostById(params.id)
  const commentData = await getCommentById(params.id)
  return {
    props: {
      postData,
      commentData,
      id: params.id,
    },
  }
}

export default Post
