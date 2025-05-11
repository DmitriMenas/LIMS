// frontend/src/components/OpenModalButton/OpenModalButton.jsx

import { useModal } from '../../context/Modal';
import './OpenModalButton.css'

function OpenModalButton({
  modalComponent, 
  buttonText,
  onButtonClick, 
  onModalClose, 
  className
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return <button onClick={onClick} className={`modal-button ${className}`}>{buttonText}</button>;
}

export default OpenModalButton;