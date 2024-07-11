import { useState, useEffect } from 'react';
import { AiFillLike } from 'react-icons/ai';
import styles from './HomePage.module.css';
import axiosInstance from '../../axiosInstance';
import { Link } from 'react-router-dom';
const { VITE_API } = import.meta.env;

// все статьи
export default function HomePage({ homePost, setHomePost, user }) {
  const [like, setLike] = useState({});

  useEffect(() => {
    (async function () {
      if (user?.id) {
        const { data } = await axiosInstance.get(`/api/v1/home/`);
        setHomePost(data);
        // Инициализация состояния лайков для каждого поста
        const initialLikes = {};
        for (const post of data) {
          const { data: likesData } = await axiosInstance.get(`/api/v1/like/tweets/${post.id}/likes/users`);
          initialLikes[post.id] = likesData.length;
        }
        setLike(initialLikes);
      }
    })();
  }, [user, setHomePost]);

  const collLike = async (post_id) => {
    const { data } = await axiosInstance.get(`/api/v1/like/tweets/${post_id}/likes/users`);
    return data.length;
  };

  const addLikePostHandler = async (user_id, post_id) => {
    await axiosInstance.post(`/api/v1/like/tweets/${post_id}/users/${user_id}/likes`);
    const updatedLikes = await collLike(post_id);
    setLike((likes) => ({
      ...likes,
      [post_id]: updatedLikes,
    }));
  };

  return (
    <>
      <div className={styles.container}>
        {homePost.map((post) => (
          <div className={styles.post} key={post.id}>
            <img src={post.img} alt={post.title} />
            <h2>{post.title}</h2>
            <div className={styles.actions}>
              <Link to={`/${post.id}`}>
                <button>Читать</button>
              </Link>
              <AiFillLike
                className={styles.iconLike}
                onClick={() => addLikePostHandler(user.id, post.id)}
              />
              <p>{like[post.id] !== undefined ? like[post.id] : 'Загрузка...'}</p>
              <div className={styles.actions}></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}