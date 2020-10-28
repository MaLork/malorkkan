export default function PickedComment({ pickedCommentData }) {
  if (pickedCommentData) {
    return (
      <div class="flex-1 text-gray-700 bg-green-400 px-4 py-2 m-2">
        <p>Best answer by author question</p>
        <h1>Author: {pickedCommentData.user}</h1>
        <h2>{new Date(pickedCommentData.time).toLocaleDateString()}</h2>
        <p>{pickedCommentData.content}</p>
      </div>
    )
  }
  return null
}
