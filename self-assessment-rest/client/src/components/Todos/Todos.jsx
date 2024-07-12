import styles from './Todos.module.css';
import { RiTodoFill, RiDeleteBin2Line } from 'react-icons/ri';
import { FaCheck } from 'react-icons/fa';
function Todos({ todo, deleteTodo, toggleTodo }) {
  return (
    <div className={`${styles.todo} ${todo.done ? styles.completedTodo : ''}`}>
      <RiTodoFill className={styles.todoIcon} />
      <div className={styles.todoText}>{todo.todo}</div>
      <RiDeleteBin2Line
        className={styles.deleteIcon}
        onClick={() => deleteTodo(todo.id)}
      />
      <FaCheck
        className={styles.checkIcon}
        onClick={() => toggleTodo(todo.id)}
      />
    </div>
  );
}

export default Todos;
