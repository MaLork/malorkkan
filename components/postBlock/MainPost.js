import CommentHeader from './PostHeader'

export default function MainPost({ postData }) {
  return (
    <>
      <div className="flex-1 px-4 ml-2 w-11/12">
        <CommentHeader postData={postData} />
        <h1 className="text-xl font-medium text-2xl">{postData.topic}</h1>
        <p
          className="mt-2 w-full pr-2"
          style={{
            fontFamily: 'Mitr-light',
          }}
        >
          {postData.content}
        </p>
      </div>
    </>
  )
}
