import { firebase, apiEndPoint } from '../constant'

async function postComment(user, content, id) {
  const authToken = await firebase.auth().currentUser.getIdToken()
  const body = {
    user,
    content,
  }
  console.log(body)
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
