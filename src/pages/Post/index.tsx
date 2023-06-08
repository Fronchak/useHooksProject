import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PostType from "../../types/PostType";
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import useFlashMessage from '../../hooks/useFlashMessage';
import useAuth from '../../hooks/useAuth';

const Post = () => {
  const { id } = useParams();
  const { getToken } = useAuth();
  const { data, isLoading, error, response } = useFetch<PostType>(`posts/${id}`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });
  const navigate = useNavigate();
  const { setMessage } = useFlashMessage();

  useEffect(() => {
    if(error !== undefined && response !== undefined) {
      if(response.status === 404) {
        navigate('/posts');
        setMessage('Post not found');
      }
      else {
        navigate('/');
        setMessage('Something went wrong, please try again later');
      }
    }
  }, [error, response, setMessage, navigate]);

  return (
    <>
      <header>
        <h1>Post details</h1>
        <p><Link to="/posts">Click here</Link> to back to all posts</p>
      </header>
      { isLoading && (
        <h2>Loading...</h2>
      ) }
      { !isLoading && data && (
        <div className="row">
          <div className="col-12 col-md-6">
            <img src="https://via.placeholder.com/600/1ee8a4" className="img-fluid" />
          </div>
          <div className="col-12 col-md-6">
            <div className="p-3">
              <h2 className="mb-3 fw-bold">{ data.title }</h2>
              <p>{ data.body }</p>
            </div>
          </div>
        </div>
      ) }
    </>
  );
}

export default Post;
