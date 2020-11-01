import React, { useState } from 'react'
import Link from 'next/link'
import router from 'next/router'
import Layout from '../../components/Layout'
import { useContext } from 'react'
import { authContext } from '../../lib/userContext'

export default function draft() {
  const [valueDesc, setValueDesc] = useState('')
  const [valueTopic, setValueTopic] = useState('')

  const user = useContext(authContext).user

  return (
    <Layout username={authUser.email} className="h-full">
      <div className="flex h-screen flex-col">
        <h1>Create a post</h1>
        <div className="flex justify-center items-center h-full flex-col text-2xl">
          <form>
            <div>
              <p className="mb-4">Topic</p>
              <input
                className="resize-none border rounded focus:outline-none focus:shadow-outline"
                type="text"
                onChange={(event) => setValueTopic(event.target.value)}
              />
            </div>
            <br />
            <div>
              <p className="mb-4">Description</p>
              <textarea
                className="h-32 w-64 resize-none border rounded focus:outline-none focus:shadow-outline"
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
