import { useState, useEffect, useRef } from 'react';
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route
} from 'react-router-dom';
import { RouterProvider } from 'react-router';
import Root from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Posts from './pages/Posts';
import Post from './pages/Post';
import FlashMessageContext, { FlashMessageData } from './context/FlashMessageContext';
import AuthContext, { AuthData } from './context/AuthContext';
import Login from './pages/Login';
import { KEY_LOCAL_STORAGE } from './utils/constants';
import PrivateRoutes from './pages/PrivateRoutes';
import About from './pages/About';
import Profile from './pages/Profile';
import UserPosts from './pages/UserPosts';
import UserAlbums from './pages/UserAlbums';
import UserTodos from './pages/UserTodos';

const router =createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={ <Root /> }
      errorElement={ <ErrorPage /> }
    >
      <Route element={ <Home /> } index />
      <Route element={ <Posts /> } path="posts" />
      <Route element={ <About /> } path="/about" />
      <Route element={ <Login /> } path="auth/login" />
      <Route element={ <PrivateRoutes /> } path="">
        <Route element={ <Post /> } path="posts/:id" />
        <Route element={ <Profile /> } path="profile" >
          <Route element={ <UserPosts /> } path="posts" />
          <Route element={ <UserAlbums /> } path="albums" />
          <Route element={ <UserTodos /> } path="todos" />
        </Route>
      </Route>
    </Route>
  )
);

const App = () => {

  const [flashMessageData, setFlashMessageData] = useState<FlashMessageData>({
    message: undefined,
    messageType: 'alert-primary',
    time: 5000
  });

  const [authData, setAuthData] = useState<AuthData>({
    email: undefined,
    id: undefined,
    token: undefined
  });

  const effectRef = useRef<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);

  const setFlashMessage = (flashMessageData: FlashMessageData) => {
    setFlashMessageData(flashMessageData);
    if(flashMessageData.message) {
      setTimeout(() => {
        setFlashMessageData({
          message: undefined,
          messageType: 'alert-primary',
          time: flashMessageData.time
        });
      }, flashMessageData.time);
    }
  };

  useEffect(() => {
    if(effectRef.current === false) {
      const authData = localStorage.getItem(KEY_LOCAL_STORAGE);
      if(authData) {
        setAuthData(JSON.parse(authData));
      }
      setReady(true);
    }
    effectRef.current = true;
  }, []);

  return (
    <>
      { ready ? (
        <AuthContext.Provider value={{ authData, setAuthData }}>
          <FlashMessageContext.Provider value={{
            flashMessage: flashMessageData,
            setFlashMessage
          }}>
            <RouterProvider router={router} />
          </FlashMessageContext.Provider>
        </AuthContext.Provider>
      ) : (
        <div className='container pt-4'>
          <h1 className="text-center">Loading...</h1>
        </div>
      ) }
    </>
  );
}

export default App;
