import './App.css';
import Root from './Root';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import SigninPage from './pages/SigninPage/SigninPage';
import SignupPage from './pages/SignupPage/SignupPage';
import PostPage from './pages/PostPage/PostPage';
import PostRead from './components/PostRead/PostRead';
import { useEffect, useState } from 'react';
import axiosInstance, { setAccessToken } from './axiosInstance';
import Todo from './pages/Todo/Todo';

function App() {
  const [user, setUser] = useState({});
  const [posts, setPost] = useState([]);
  const [homePost, setHomePost] = useState([]);
  useEffect(() => {
    axiosInstance(`${import.meta.env.VITE_API}/tokens/refresh`).then((res) => {
      setUser(res.data.user);
      setAccessToken(res.data.accessToken);
    });
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root user={user} setUser={setUser} />,
      children: [
        {
          path: '/',
          element: <HomePage user={user} homePost={homePost} setHomePost={setHomePost}/>,
        },
        {
          path: '/signin',
          element: <SigninPage setUser={setUser} />,
        },
        {
          path: '/signup',
          element: <SignupPage setUser={setUser} />,
        },
        {
          path: '/todo',
          element: <Todo setUser={setUser} user={user}/>,
        },
        {
          path: '/post',
          element: <PostPage  user={user} posts={posts} setPost={setPost}/>,
        },
        {
          path: '/post/:id',
          element: <PostRead  user={user} posts={posts} setPost={setPost}/>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
