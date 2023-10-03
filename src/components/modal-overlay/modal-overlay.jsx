import PropTypes from "prop-types";

import styles from "./modal-overlay.module.css";

export const ModalOverlay = ({ onClose, children }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func,
};
