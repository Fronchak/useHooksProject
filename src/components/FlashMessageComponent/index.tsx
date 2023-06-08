import useFlashMessage from "../../hooks/useFlashMessage";
import './styles.css';

const FlashMessageComponent = () => {

  const { flashMessage: { message, messageType } } = useFlashMessage();

  return (
    <>
      { message && (
        <div id="flash-message-container" className="py-3">
          <div className={ `alert ${messageType} mb-0` } role="alert">
            { message }
          </div>
        </div>
      ) }
    </>
  );

}

export default FlashMessageComponent;
