
import TodoType from '../../types/TodoType';
import './styles.css';

type Props = {
  todo: TodoType
}

const Todo = ({ todo }: Props) => {

  return (
    <h4 className={ todo.completed ? 'done' : 'undone' }>{ todo.title }</h4>
  );
}

export default Todo;
