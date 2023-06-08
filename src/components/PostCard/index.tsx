import { Link } from 'react-router-dom';
import PostType from "../../types/PostType";
import './styles.css';

type Props = {
  post: PostType;
  img: string;
}

const PostCard = ({ post, img }: Props) => {
  return (
    <div className="card">
      <img src={img} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{ post.title }</h5>
        <p className="card-text">{ post.body }</p>
        <Link to={`/posts/${post.id}`} className="btn btn-primary">See more</Link>
      </div>
    </div>
  );
}

export default PostCard;
