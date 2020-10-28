import {
  retrievePostData,
  getPostById,
  getAllPathId,
} from '../../lib/getData/retrievePostData'
import { getCommentById } from '../../lib/getData/retrieveCommentData'
import MainPost from '../../components/postBlock/MainPost'
import CommentPost from '../../components/postBlock/CommentPost'
import PickedComment from '../../components/postBlock/PickedComment'

const Post = ({ postData, commentData }) => {
  return (
    <>
      <div class="container mx-auto flex content-center flow-root w-1/3">
        <MainPost postData={postData} />
        <PickedComment pickedCommentData={commentData.pickedComment} />
        <CommentPost commentData={commentData.comments} />
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const allPath = await retrievePostData()
  const paths = getAllPathId(allPath)
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostById(params.id)
  const commentData = await getCommentById(params.id)
  return {
    props: {
      postData,
      commentData,
    },
  }
}

export default Post
