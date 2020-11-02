import { firebase, apiEndPoint } from '../constant'

async function getPendingById(id) {
  const tokenId = await firebase.auth().currentUser.getIdToken()
  const res = await fetch(`${apiEndPoint}/pending/${id}`, {
    headers: {
      Authorization: `Bearer ${tokenId}`,
    },
  })
  const data = await res.json()
  return data
}

export { getPendingById }
