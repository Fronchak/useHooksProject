import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useFlashMessage from '../../hooks/useFlashMessage';
import useAuth from '../../hooks/useAuth';
import './styles.css';

const Login = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setMessage } = useFlashMessage();
  const { authenticate } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const getRandomId = () => {
    return Math.floor((Math.random() * 10) + 1);
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(!email.includes("@")) {
      setMessage('Invalid email format', 'alert-danger', 2500);
      return;
    }
    if(password.length < 7) {
      setMessage('Email or password invalid', 'alert-danger', 2500);
      return;
    }
    authenticate(email, getRandomId(), 'Mock token');
    setMessage('Login with success', 'alert-success');
    const from = state && state.from ? state.from : '/posts';
    navigate(from);
  }

  return (
    <div id="login-container">
      <h1>Faça o login</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
          <label htmlFor='email' className="form-label">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={ email }
            onChange={(e) => onEmailChange(e)}
            placeholder='Enter your email'
          />
        </div>
        <div className="mb-3">
          <label htmlFor='password' className="form-label">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => onPasswordChange(e)}
            placeholder='Enter your password'
          />
        </div>
        <div className="mb-3">
          <button type='submit' className="btn btn-primary w-100">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
