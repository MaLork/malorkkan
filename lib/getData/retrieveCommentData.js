async function getCommentById(id) {
  const res = await fetch(
    `https://asia-east2-malork-kantoer.cloudfunctions.net/comment/${id}`
  )
  const data = await res.json()
  return data
}

export { getCommentById }
