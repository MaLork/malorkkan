import { firebase, apiEndPoint } from '../constant'

async function postForum(user, content, id) {
  const authToken = await firebase.auth().currentUser.getIdToken()
  const body = {
    user,
    content,
  }
  const res = await fetch(`${apiEndPoint}/comment/${id}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  })
  return res
}

export { postComment }
