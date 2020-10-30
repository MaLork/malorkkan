import { apiEndPoint } from '../constant'

async function retrievePostData() {
  const res = await fetch(`${apiEndPoint}/posts`)
  const postData = res.json()
  return postData
}

async function getPostById(id) {
  const res = await fetch(`${apiEndPoint}/post/${id}`)
  const data = await res.json()
  return data
}

const getAllPathId = (data) => {
  const allPathId = []
  for (const post of data) {
    allPathId.push({
      params: { id: `${post.id}` },
    })
  }
  return allPathId
}

export { retrievePostData, getPostById, getAllPathId }
