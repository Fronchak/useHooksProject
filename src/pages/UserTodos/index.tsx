import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useFlashMessage from "../../hooks/useFlashMessage";
import useFetch from "../../hooks/useFetch";
import TodoType from "../../types/TodoType";
import Todo from '../../components/Todo';


const UserTodos = () => {

  const { getId, getToken } = useAuth();
  const { setMessage } = useFlashMessage();
  const navigate = useNavigate();
  const { isLoading, data, error, response } = useFetch<Array<TodoType>>(`users/${getId()}/todos`, {
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
        setMessage('Something went wrong, please try again later');
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
        data.map((todo) => (
          <div className="p-2" key={ todo.id }>
            <Todo todo={todo} />
          </div>
        ))
      ) }
    </>
  );
}

export default UserTodos;
