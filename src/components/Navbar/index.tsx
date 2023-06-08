import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useFlashMessage from '../../hooks/useFlashMessage';

const Navbar = () => {
  const { isAuthenticated, logout, getEmail } = useAuth();
  const { setMessage } = useFlashMessage();
  const navigate = useNavigate();

  const onClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    logout();
    setMessage('Logout with success');
    navigate('/');
  }

  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Fake API
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/posts">Posts</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            { isAuthenticated() && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">Profile</NavLink>
              </li>
            ) }
          </ul>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end w-100">
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard" ></NavLink>
              </li>
              { isAuthenticated() ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link"
                      to="/auth/logout"
                      onClick={(e) => onClick(e)}
                    >Logout</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/profile" >{ getEmail() }</NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/auth/login" >Login</NavLink>
                </li>
              ) }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
