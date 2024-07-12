import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import styles from './PostUpdate.module.css';
import { useEffect, useState } from 'react';

export default function PostUpdate({ setHomePost, setPost, user }) {
  const [text, setText] = useState({ title: '', post: '' });

  const params = useParams();
  // console.log(text)

  const onSubmitHandlet = async (event) => {
    event.preventDefault();
    const newPost = {
      title: text.title,
      post: text.post,
      id: params.id,
    };
    await axiosInstance.patch(
      `${import.meta.env.VITE_API}/post/update/${params.id}`,
      newPost
    );
  };

  // пока помогает , все статьи одного пользователя
  useEffect(() => {
    (async function () {
      if (user?.id) {
        const { data } = await axiosInstance.get(
          `${import.meta.env.VITE_API}/post/${user?.id}`
        );
        setPost(data);
      }
    })();
  }, [onSubmitHandlet]);

  return (
    <>
      <Link to="/post">
        <button className={styles.button}>Назад</button>
      </Link>
      <form onSubmit={onSubmitHandlet} className={styles.todoContainer}>
        <input
          defaultValue={text?.title}
          onChange={(e) =>
            setText((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Заголовок"
          name="title"
        />
        <input
          defaultValue={text?.post}
          onChange={(e) =>
            setText((prev) => ({ ...prev, post: e.target.value }))
          }
          placeholder="Текст"
          name="text"
        />
        
        <button type="submit" className={styles.submitButton}>
          Редактировать
        </button>
        
      </form>
    </>
  );
}
