import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFlashMessage from "../../hooks/useFlashMessage";
import useAuth from "../../hooks/useAuth";
import useFetch from '../../hooks/useFetch';
import AlbumType from '../../types/AlbumType';
import AlbumCard from '../../components/AlgumCard';

const UserAlbums = () => {

  const navigate = useNavigate();
  const { setMessage } = useFlashMessage();
  const { getId, getToken } = useAuth();
  const { isLoading, data, error, response } = useFetch<Array<AlbumType>>(`users/${getId()}/albums`, {
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
        data.map((album) => (
          <div className="p-2" key={album.id}>
            <AlbumCard album={album} />
          </div>
        ))
      ) }
    </>
  );
}

export default UserAlbums;
