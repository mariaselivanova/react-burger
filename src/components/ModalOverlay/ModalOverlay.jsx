import ModalOverlayStyle from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({ onClose }) {
  return (
    <div onClick={onClose} className={ModalOverlayStyle.overlay} />
  )
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default ModalOverlay
