import { Link, useParams } from 'react-router-dom';
import styles from './PostReadHome.module.css';


export default function PostReadHome({homePost, setHomePost}) {
    const params = useParams();
    console.log(params)
  const post = homePost.find((el) => el.id === Number(params.id));

  return (
    <div className={styles.container}>
      <Link to='/'>
        <button className={styles.button}>Назад</button>
      </Link>
      <h1 className={styles.title}>{post?.title}</h1>
      <h2 className={styles.content}>{post?.post}</h2>
    </div>
  );
}
