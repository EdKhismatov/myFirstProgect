import Todos from './Todos';
import styles from './TodoList.module.css';

export default function TodoList({ deleteTodo, todos, toggleTodo }) {
  return (
    <div className={styles.todoListContainer}>
      {!todos.length && <h2>Задач нет</h2>}
      {todos.map((todo) => (
        <Todos key={todo.id} todo={todo} deleteTodo={deleteTodo} toggleTodo={toggleTodo}/>
      ))}
    </div>
  );
}
