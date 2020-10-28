import Link from 'next/link'
import styles from '../../styles/NavBar.module.css'

export default function allPostList({ postData }) {
  return (
    <ul>
      {postData.map((post) => {
        return (
          <li key={post.id}>
            <Link href={`/post/${post.id}`}>
              <a className={styles.text}>{post.topic}</a>
            </Link>
            <h3>{post.user}</h3>
          </li>
        )
      })}
    </ul>
  )
}
