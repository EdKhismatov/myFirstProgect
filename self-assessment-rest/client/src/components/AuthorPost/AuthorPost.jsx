import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import styles from './AuthorPost.module.css';

export default function AuthorPost() {
    const [author, setAuthor] = useState([])
    const params = useParams();
    useEffect(() => {
        (async function () {
            const { data } = await axiosInstance.get(
              `${import.meta.env.VITE_API}/post/tweets/${params.id}/users`
            );
            setAuthor(data)
        })();
      }, []);

  return (
    <div className={styles.container}>
        <Link to='/'>
        <button className={styles.button}>Назад</button>
      </Link>
      <h1 className={styles.title}>Автор поста</h1>
        <div key={author.id} className={styles.userCard}>
          <h1 className={styles.userName}>Имя: {author?.username}</h1>
          <p className={styles.userEmail}>Email: {author?.email}</p>
        </div>
    </div>
  )
}
