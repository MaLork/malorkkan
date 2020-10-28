export default function MainPost({ postData }) {
  return (
    <>
      <div class="flex-1 text-gray-700 bg-gray-400 px-4 py-2 m-2">
        <h1>Topic: {postData.topic}</h1>
        <h2>Author: {postData.user}</h2>
        <p>{postData.content}</p>
      </div>
    </>
  )
}
