import React, { useState } from 'react'
import Link from 'next/link'

export default function draft() {
  const [value, setValue] = useState('')
  const [valueTopic, setValueTopic] = useState('')

  console.log(value, valueTopic)

  return (
    <div className="flex justify-center items-center h-full flex-col">
      <div>
        <div>
          Topic: <br />
          <input
            className="resize-none border rounded focus:outline-none focus:shadow-outline"
            type="text"
            onChange={(event) => setValueTopic(event.target.value)}
          />
        </div>
        <br />
        <div>
          Description:
          <br />
          <textarea
            className="h-32 w-64 resize-none border rounded focus:outline-none focus:shadow-outline"
            onChange={(event) => setValue(event.target.value)}
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
      </div>
    </div>
  )
}
