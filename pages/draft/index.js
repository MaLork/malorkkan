import React, { useState } from 'react'
import Link from 'next/link'
import router from 'next/router'
import Layout from '../../components/Layout'
import { useContext } from 'react'
import { authContext } from '../../lib/userContext'
import { postForum } from '../../lib/sendMethods/sendPostData'
import style from '../../styles/register.module.css'

export default function draft() {
  const [valueDesc, setValueDesc] = useState('')
  const [valueTopic, setValueTopic] = useState('')

  const user = useContext(authContext)

  return (
    <Layout username={user.displayName} admin={user.admin} className="h-full">
      <div className="px-40 flex h-screen flex-col">
        <p style={{fontFamily:"Roboto-Regular",fontSize:36}}>Create a post</p>
        <div className="flex justify-center items-center h-full flex-col text-2xl">
          <form
            onSubmit={async (e) => {
              e.preventDefault()

              if (!user) {
                alert('Please Login First!')
                return
              }

              if (valueTopic.length === 0) {
                alert("Topic can't be empty")
                return
              }

              const res = await postForum(
                user.displayName,
                valueDesc,
                valueTopic
              )
              if (res.status === 200) {
                router.push('/draft/complete', undefined, { shallow: true })
                return
              }
            }}
          >
            <div>
              <p style={{"fontFamily":"Quark-Bold","fontSize":"36px"}}>Topic</p>
              <input
              className={style.input}
                type="text"
                onChange={(event) => setValueTopic(event.target.value)}
              />
            </div>
            <br />
            <div>
              <p style={{"fontFamily":"Quark-Bold","fontSize":"36px"}}>Description</p>
              <textarea
                className={style.inputTextArea}
                onChange={(event) => setValueDesc(event.target.value)}
              ></textarea>
            </div>
            <br />
            <div>
              <Link href="/">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mr-2 py-2 px-4 rounded">
                  Back
                </button>
              </Link>
              <button
                className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
                type="primary"
              >
                Create Question
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}
