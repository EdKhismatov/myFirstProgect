import { useState } from 'react';
import styles from './TodoForm.module.css';
import Button from '../UI/Button';

export default function TodoForm({ addTodo}) {
  const [text, setText] = useState('');
  const onSubmitHandlet = (event) => {
    event.preventDefault();
    addTodo(text);
    setText('');
  };
  return (
    <div className={styles.todoContainer}>
      <form onSubmit={onSubmitHandlet}>
        <input
          placeholder="Введите задачу"
          value={text}
          onChange={(e) => setText(e.target.value)}
          name='todo'
        />
        <Button type="submit" title='Создать заметку'>Создать</Button>
      </form>
    </div>
  );
}
