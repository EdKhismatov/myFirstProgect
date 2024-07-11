import TodoList from '../../components/Todos/TodoList';
import TodosActions from '../../components/Todos/TodosActions';
import axiosInstance from '../../axiosInstance';
// import { v4 as uuidv4 } from 'uuid';
import TodoForm from '../../components/Todos/TodoForm';
import './Todo.module.css';
import { useEffect, useState } from 'react';

export default function Todo({ user }) {
  const [todos, setTodo] = useState([]);

  const addTodoHandler = async (text) => {
    const newTodo = {
      todo: text,
      user_id: user?.id,
      done: false,
    };
    const { data } = await axiosInstance.post(
      `${import.meta.env.VITE_API}/todo`,
      newTodo
    );
    setTodo([...todos, data]);
  };

  const deleteTodoHandler = async (id) => {
    await axiosInstance.delete(`/api/v1/todo/${id}`);
    setTodo(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodoHandler = async (id) => {
    console.log(id);
    await axiosInstance.put(`/api/v1/todo/${id}`);
    setTodo(
      todos.map((todo) => {
        // console.log(todo);
        return todo.id === id ? { ...todo, done: !todo.done } : { ...todo };
      })
    );
  };

  useEffect(() => {
    (async function () {
      if (user?.id) {
        const { data } = await axiosInstance.get(`/api/v1/todo/${user?.id}`);
        setTodo(data);
      }
    })();
  }, [user]);

  const resetTodosHandler = async () => {
    const { data } = await axiosInstance.get(`/api/v1/todo/${user?.id}`);
    data.map(async (todo) => {
      await axiosInstance.delete(`/api/v1/todo/${todo.id}`);
    });
    setTodo([]);
  };

  const deleteCompletedTodosHandler = async () => {
    const { data } = await axiosInstance.get(`/api/v1/todo/${user?.id}`);
    data.map(async (todo) => {
      if (todo.done) {
        await axiosInstance.delete(`/api/v1/todo/${todo.id}`);
      }
    });
    setTodo(todos.filter((todo) => !todo.done));
  };
  const completedTodoCount = todos.filter((todo) => todo.done).length;


  
  return (
    <div>
      <h1>задачи</h1>
      <TodoForm setTodo={setTodo} addTodo={addTodoHandler} />
      {todos.length > 0 && (
        <TodosActions
          completedTodoExist={!!completedTodoCount}
          resetTodos={resetTodosHandler}
          deleteCompletedTodos={deleteCompletedTodosHandler}
        />
      )}
      <TodoList
        deleteTodo={deleteTodoHandler}
        todos={todos}
        toggleTodo={toggleTodoHandler}
      />
      {completedTodoCount > 0 && (
        <h2>Количество завершенных задач: {completedTodoCount}</h2>
      )}
    </div>
  );
}
