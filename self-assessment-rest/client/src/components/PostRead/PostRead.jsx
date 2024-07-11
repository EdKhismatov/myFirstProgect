import { Link, useParams } from 'react-router-dom';

export default function PostRead({ posts, setPost }) {
  const params = useParams();
  const post = posts.find((el) => el.id === Number(params.id));

  return (
    <div>
        <Link to='/post'>
        <button>Назад</button>
        </Link>
      <h1>{post.title}</h1>
      <h1>{post.post}</h1>
    </div>
  );
}
