import { firebase, apiEndPoint } from '../constant'

async function postForum(user, content, topic) {
  const authToken = await firebase.auth().currentUser.getIdToken()
  const body = {
    user,
    topic,
    content,
  }
  const res = await fetch(`${apiEndPoint}/pendings`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  })
  return res
}

export { postForum }
