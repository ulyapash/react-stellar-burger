import { useEffect } from "react";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { ModalOverlay } from "../modal-overlay/modal-overlay";

import styles from "./modal.module.css";

export const Modal = ({ title, onClose, children }) => {
  const handleClose = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleClose);

    return () => {
      document.removeEventListener("keydown", handleClose);
    };
  });

  return (
    <ModalOverlay onClose={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {title && (
          <header className={`${styles.header} mt-10 ml-10 mr-10`}>
            <h2 className="text text_type_main-large">{title}</h2>
          </header>
        )}
        <button className={styles.closeButton} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
};
