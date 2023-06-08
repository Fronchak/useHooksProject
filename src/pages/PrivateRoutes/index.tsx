import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useFlashMessage from '../../hooks/useFlashMessage';

type Props = {
  redirectTo?: string
}

const PrivateRoutes = ({ redirectTo = "/auth/login" }: Props) => {

  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { setMessage } = useFlashMessage();
  const { isAuthenticated } = useAuth();
  const effectRef = useRef<boolean>(false);

  useEffect(() => {
    if(effectRef.current === false) {
      if(!isAuthenticated()) {
        setMessage('You need to login to access this page');
        navigate(redirectTo, {
          replace: true,
          state: {
            from: pathname
          }
        });
      }
      else {
        setAuthenticated(true);
      }
    }
    effectRef.current = true;
  }, [isAuthenticated, setMessage, navigate, pathname, redirectTo]);

  if(authenticated) {
    return <Outlet />
  }
  else {
    return <></>
  }

}

export default PrivateRoutes;
