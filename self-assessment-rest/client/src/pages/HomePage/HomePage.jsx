import { useState, useEffect } from 'react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { AiOutlineContainer } from 'react-icons/ai';
import styles from './HomePage.module.css';
import axiosInstance from '../../axiosInstance';
import { Link } from 'react-router-dom';
const { VITE_API } = import.meta.env;

export default function HomePage({homePost, setHomePost, user}) {

  useEffect(() => {
    (async function () {
      if (user?.id) {
        const { data } = await axiosInstance.get(`/api/v1/home/`);
        setHomePost(data);
      }
    })();
  }, [user]);

  
return (
  <>
      <div className={styles.container}>
        {homePost.map((post) => (
          <div className={styles.post} key={post.id}>
            <img src={post.img} alt={post.title} />
            <h2>{post.title}</h2>
            <div className={styles.actions}>
              <Link to={`/post/${post.id}`}>
              <button>Читать</button>
              </Link>
              <div className={styles.actions}>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
);
};
