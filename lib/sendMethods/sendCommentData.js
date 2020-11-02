import { firebase, apiEndPoint } from '../constant'

async function postComment(user, content, id) {
  const authToken = await firebase.auth().currentUser.getIdToken()
  const body = {
    username: user,
    content,
  }
  const res = await fetch(`${apiEndPoint}/comment/${id}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  })
  return res
}

export { postComment }
