import { useContext } from 'react';
import FlashMessageContext, { MessageType } from '../context/FlashMessageContext';

const useFlashMessage = () => {

  const { flashMessage, setFlashMessage } = useContext(FlashMessageContext);

  const setMessage = (message: string, messageType: MessageType = 'alert-primary', time = 5000) => {
    setFlashMessage({
      message,
      messageType,
      time
    });
  }

  return { flashMessage, setMessage };
}

export default useFlashMessage;
