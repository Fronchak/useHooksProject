import { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import useAuth from "../../hooks/useAuth"
import useFetch from '../../hooks/useFetch';
import UserType from '../../types/UserType';
import useFlashMessage from '../../hooks/useFlashMessage';
import './styles.css';

const Profile = () => {

  const { getId, getToken } = useAuth();
  const { isLoading, data, error, response } = useFetch<UserType>(`users/${getId()}`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });
  const { setMessage } = useFlashMessage();
  const navigate = useNavigate();

  useEffect(() => {
    if(error !== undefined && response !== undefined) {
      if(response.status === 404) {
        setMessage('User not found');
        navigate('/posts');
      }
      else {
        setMessage('Something went wrong, please try again later', 'alert-danger');
        navigate('/');
      }
    }
  }, [error, response, setMessage, navigate]);

  return (
    <>
      <header>
        <h1>User profile</h1>
      </header>
      { isLoading && (
        <h2>Loading...</h2>
      ) }
      { !isLoading && data && (
        <>
          <div className="my-2">
            <h1><span className="fw-bold">Name: </span>{ data.name }</h1>
            <h2><span className="fw-bold">Username: </span>{ data.username }</h2>
            <h2><span className="fw-bold">Email: </span>{ data.email }</h2>
          </div>
          <div id="profile-details-container" className="my-2">
            <div id="profile-options-container">
              <div className="profile-option-container">
                <NavLink to="posts">Posts</NavLink>
              </div>
              <div className="profile-option-container">
                <NavLink to="albums">Albums</NavLink>
              </div>
              <div className="profile-option-container">
                <NavLink to="todos">Todos</NavLink>
              </div>
            </div>
          </div>
          <Outlet />
        </>

      ) }
    </>
  );
}

export default Profile;
