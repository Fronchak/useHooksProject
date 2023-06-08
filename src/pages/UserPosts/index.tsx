import { useEffect } from 'react';
import useAuth from "../../hooks/useAuth";
import PostsContainer from "../../components/PostsContainer";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import useFlashMessage from "../../hooks/useFlashMessage";
import PostType from '../../types/PostType';

const UserPosts = () => {

  const { getId, getToken } = useAuth();
  const navigate = useNavigate();
  const { setMessage } = useFlashMessage();
  const { isLoading, data, error, response } = useFetch<Array<PostType>>(`users/${getId()}/posts`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });

  useEffect(() => {
    if(error !== undefined && response !== undefined) {
      if(response.status === 404) {
        setMessage('Page not found');
      }
      else {
        setMessage('Something went wrong, please try again later', 'alert-danger');
      }
      navigate('/');
    }
  }, [error, response, setMessage, navigate]);

  return (
    <>
      { isLoading && (
        <h3>Loading...</h3>
      ) }
      { !isLoading && data && (
        <PostsContainer posts={data} />
      ) }
    </>
  );
}

export default UserPosts;
