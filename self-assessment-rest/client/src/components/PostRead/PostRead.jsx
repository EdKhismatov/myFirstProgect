import { Link, useParams } from 'react-router-dom';
import styles from './PostRead.module.css';

export default function PostRead({ posts, setPost }) {
  const params = useParams();
  const post = posts.find((el) => el.id === Number(params.id));

  return (
    <div className={styles.container}>
      <Link to='/post'>
        <button className={styles.button}>Назад</button>
      </Link>
      <h1 className={styles.title}>{post?.title}</h1>
      <h1 className={styles.content}>{post?.post}</h1>
    </div>
  );
}
