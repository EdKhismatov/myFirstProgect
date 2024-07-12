import axiosInstance, { setAccessToken } from '../../axiosInstance';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

export default function Navbar({ user, setUser }) {
  const logoutHandler = async () => {
    const res = await axiosInstance(`${import.meta.env.VITE_API}/auth/logout`);

    if (res.status === 200) {
      setUser(null);
      setAccessToken('');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Link to="/" className={styles.word}>На главную</Link>
        {user?.username ? (
          <>
            <Link to="/post" className={styles.word}>Написать статью</Link>
            <Link to="/todo" className={styles.word}>Заметки</Link>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.right}>
        {user?.username ? (
          <>
            <Link className={styles.word}>{user.username}</Link>
            <Link onClick={logoutHandler} className={styles.word}>Выйти</Link>
          </>
        ) : (
          <>
            <Link to="/signin" className={styles.word}>Войти</Link>
            <Link to="/signup" className={styles.word}>Регистрация</Link>
          </>
        )}
      </div>
    </div>
  );
}
