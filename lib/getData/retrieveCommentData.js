import { apiEndPoint } from '../constant'

async function getCommentById(id) {
  const res = await fetch(`${apiEndPoint}/comment/${id}`)
  const data = await res.json()
  return data
}

export { getCommentById }
