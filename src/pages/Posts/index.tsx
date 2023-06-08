import PostType from '../../types/PostType';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import PostsContainer from '../../components/PostsContainer';

const Posts = () => {

  const { data, isLoading, error } = useFetch<Array<PostType>>('posts', {});
  const navigate = useNavigate();

  const handleError = () => {
    if(error) {
      navigate('/');
    }
    return <></>
  }

  return (
    <div>
      <header>
        <h1>Posts</h1>
      </header>
      { isLoading && (
        <h2>Loading posts...</h2>
      ) }
      { !isLoading && error !== undefined && handleError() }
      { !isLoading && data && (
        <PostsContainer posts={data} />
      ) }
    </div>
  );
}

export default Posts;
