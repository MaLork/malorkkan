export default function CommentPost({ commentData }) {
  if (commentData.length === 0) {
    return (
      <div class="flex-1 px-4 py-2 m-2">
        <p>Knowing the answer? Please help them</p>
      </div>
    )
  }
  return commentData.map((data) => {
    return (
      <>
        <div class="flex-1 text-gray-700 bg-gray-200 px-4 py-2 m-2">
          <h1>Author: {data.user}</h1>
          <h2>{new Date(data.time).toLocaleDateString()}</h2>
          <p>{data.content}</p>
        </div>
      </>
    )
  })
}
