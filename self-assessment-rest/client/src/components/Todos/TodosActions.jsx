import Button from '../UI/Button';
import styles from './TodosActions.module.css';
import { RiDeleteBin2Line, RiRefreshLine } from 'react-icons/ri';
export default function TodosActions({
  resetTodos,
  deleteCompletedTodos,
  completedTodoExist,
}) {
  return (
    <div className={styles.todosActionsContainer}>
      <Button title="Удалить Все" onClick={resetTodos}>
        <RiRefreshLine />
      </Button>
      <Button
        title="Удалить завершенные задачи"
        onClick={deleteCompletedTodos}
        disabled={!completedTodoExist}
      >
        <RiDeleteBin2Line />
      </Button>
    </div>
  );
}
