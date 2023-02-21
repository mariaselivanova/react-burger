import ReactDOM from "react-dom";
import { useEffect } from "react";
import PropTypes from 'prop-types';
import ModalStyle from './Modal.module.css';
import ModalOverlay from "../ModalOverlay/ModalOverlay";
// eslint-disable-next-line no-unused-vars
import { CloseIcon, Typography } from '@ya.praktikum/react-developer-burger-ui-components';

const portal = document.getElementById("portal");

function Modal({ children, onClose, title }) {

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [onClose]);

  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay onClose={onClose} />
        <div className={ModalStyle.container}>
          {title && <h2 className={`${ModalStyle.title} text text_type_main-large`}>{title}</h2>}
          <button onClick={onClose} className={ModalStyle.button}><CloseIcon type="primary" /></button>
          {children}
        </div>
      </>
    ), portal
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default Modal
