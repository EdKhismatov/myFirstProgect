import PostForm from '../../components/Posts/PostForm';
import { useEffect, useState } from 'react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { AiOutlineContainer } from 'react-icons/ai';
import axiosInstance from '../../axiosInstance';
import styles from './PostPage.module.css';
import { Link } from 'react-router-dom';
// import './PostPage.module.css';
export default function PostPage({ user, posts, setPost }) {
  const [gif, setGif] = useState('');

  const addPostHandler = async (text) => {
    const newPost = {
      title: text.title,
      post: text.text,
      user_id: user?.id,
      img: './фото.png',
    };
    const { data } = await axiosInstance.post(
      `${import.meta.env.VITE_API}/post`,
      newPost
    );
    setPost([...posts, data]);
  };


  const deleteTodoHandler = async (id) => {
    const { data } = await axiosInstance.get(
      `/api/v1/like/tweets/${id}/likes/users`
    );
    data.map(async (like) => {
      await axiosInstance.delete(`/api/v1/like/tweets/${id}/${like.id}/likes`);
    });
    await axiosInstance.delete(`/api/v1/post/${id}`);
    setPost(posts.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <div>
        <PostForm addPost={addPostHandler} setGif={setGif} />
      </div>
      <div className={styles.container}>
        {posts.map((post) => (
          <div className={styles.post} key={post.id}>
            <img src={post.img} alt={post.title} />
            <h2>{post.title}</h2>
            <div className={styles.actions}>
              <Link to={`/post/${post.id}`}>
                <button>Читать</button>
              </Link>
              <div className={styles.actions}>
              <Link to={`/update/${post.id}`}>
                <AiOutlineContainer
                  title="Редактировать"
                  className={styles.icon}
                />
                </Link>
                <RiDeleteBin2Line
                  title="Удалить"
                  className={styles.iconDel}
                  onClick={() => deleteTodoHandler(post.id)}
                />
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </>
  );
}
