import CommentHeader from './PostHeader'

export default function CommentPost({ commentData }) {
  if (commentData.length === 0) {
    return null
  }
  return commentData.map((data) => {
    return (
      <>
        <div class="flex-1 px-4 py-1 m-2" key={data.commentId}>
          <CommentHeader postData={data} />
          <p className="px-10" style={{ fontFamily: 'Mitr-light' }}>
            {data.content}
          </p>
        </div>
        <hr
          className="mx-4 my-2"
          style={{ backgroundColor: '#8E8E8E', height: '1px' }}
        />
      </>
    )
  })
}
