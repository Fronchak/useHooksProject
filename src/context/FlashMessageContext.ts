import { createContext } from 'react';

export type MessageType = 'alert-primary' | 'alert-success' | 'alert-danger';

export type FlashMessageData = {
  message: string | undefined;
  messageType: MessageType;
  time: number;
}

export type FlashMessageContextType = {
  flashMessage: FlashMessageData;
  setFlashMessage: (flashMessage: FlashMessageData) => void
}

const FlashMessageContext = createContext<FlashMessageContextType>({
  flashMessage: {
    message: undefined,
    messageType: 'alert-primary',
    time: 5000
  },
  setFlashMessage: () => null
});

export default FlashMessageContext;
