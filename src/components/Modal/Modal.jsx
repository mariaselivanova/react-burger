import ReactDOM from "react-dom";
import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import ModalStyle from './Modal.module.css';
import ModalOverlay from "../ModalOverlay/ModalOverlay";
// eslint-disable-next-line no-unused-vars
import { CloseIcon, Typography } from '@ya.praktikum/react-developer-burger-ui-components';

const portal = document.getElementById("portal");

function Modal({ children, open, onClose, title }) {

  useEffect(() => {
    if (!open) return;
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [open, onClose]);

  if (!open) return null

  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay onClose={onClose} open={open} />
        <div className={ModalStyle.container}>
          <h2 className={`${ModalStyle.title} text text_type_main-large`}>{title}</h2>
          <button onClick={onClose} className={ModalStyle.button}><CloseIcon type="primary" /></button>
          {children}
        </div>
      </>
    ), portal
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

export default Modal
