import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import styles from './UsersLikePost.module.css';
export default function UsersLikePost() {
const [userLike, setUserLike] = useState([])

    const params = useParams();
    useEffect(() => {
        (async function () {
            const { data } = await axiosInstance.get(
              `${import.meta.env.VITE_API}/like//tweets/${params.id}/likes/users`
            );
            setUserLike(data)
        })();
      }, []);

  return (
    <div className={styles.container}>
        <Link to='/'>
        <button className={styles.button}>Назад</button>
      </Link>
      <h1 className={styles.title}>Поставили Лайк</h1>
      {userLike?.map((user) => (
        <div key={user.id} className={styles.userCard}>
          <h1 className={styles.userName}>Имя: {user?.username}</h1>
          <p className={styles.userEmail}>Email: {user?.email}</p>
        </div>
      ))}
    </div>
  )
}
