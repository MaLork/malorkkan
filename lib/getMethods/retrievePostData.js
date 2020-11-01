import { apiEndPoint } from '../constant'

async function retrievePostData() {
  const postData = []
  for (let page = 1; ; page++) {
    const res = await fetch(`${apiEndPoint}/posts?page=${page}`)
    try {
      const postDataTemp = await res.json()
      for (let content of postDataTemp) {
        postData.push(content)
      }
    } catch (error) {
      break
    }
  }
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
