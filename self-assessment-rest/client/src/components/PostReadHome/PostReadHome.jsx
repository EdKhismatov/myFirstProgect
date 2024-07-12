
import { Link, useParams } from 'react-router-dom';

export default function PostReadHome({homePost, setHomePost}) {
    const params = useParams();
    console.log(params)
  const post = homePost.find((el) => el.id === Number(params.id));

  return (
    <div>
      <Link to="/">
        <button>Назад</button>
      </Link>
      <h1>{post?.title}</h1>
      <h1>{post?.post}</h1>
    </div>
  );
}
