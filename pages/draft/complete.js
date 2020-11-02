import Layout from '../../components/Layout.js'
import { useContext } from 'react'
import { authContext } from '../../lib/userContext'

export default function draftComplete() {
  const user = useContext(authContext)
  return (
    <Layout username={user.displayName} admin={user.admin}>
      <div
        class="flex text-center items-center justify-center"
        style={{ height: '100%', minHeight: '71.7vh' }}
      >
        <div class="-mt-16">
          <p
            style={{
              fontFamily: 'Lato-Bold',
              fontSize: '48px',
              color: '#AB3B61',
            }}
          >
            Thank you for posting a discussion!
          </p>
          <p
            class="mb-6 mt-2"
            style={{ fontFamily: 'Mitr-Light', fontSize: '32px' }}
          >
            Waiting for our staff checking your question within 24 hours
          </p>
        </div>
      </div>
    </Layout>
  )
}
