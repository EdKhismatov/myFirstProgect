import { useState } from 'react';
import styles from './PostForm.module.css';
import axios from 'axios';

export default function TodoForm({ addPost, setGif }) {
  const [text, setText] = useState({ title: '', text: '' });

  const onSubmitHandlet = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        'https://api.thecatapi.com/v1/images/search?limit=10'
      );
      const url = await response.json();
      const gif = url.find((el) => el.url);
      addPost(text);
      setText({ title: '', text: '' });
      setGif(gif.url);
    } catch (error) {
      console.error('Ошибка при загрузке GIFs:', error);
    }
  };

  return (
    <form onSubmit={onSubmitHandlet} className={styles.todoContainer}>
      <input
        value={text.title}
        onChange={(e) =>
          setText((prev) => ({ ...prev, title: e.target.value }))
        }
        placeholder="Заголовок"
        name="title"
        //   className={styles.input}
      />
      <input
        value={text.text}
        onChange={(e) => setText((prev) => ({ ...prev, text: e.target.value }))}
        placeholder="Текст"
        //   className={styles.input}
        name="text"
      />
      <button type="submit" className={styles.submitButton}>
        создать
      </button>
    </form>
  );
}
