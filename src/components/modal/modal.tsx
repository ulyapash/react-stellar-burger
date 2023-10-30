import { useEffect, useMemo, useCallback, FC } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { ModalOverlay } from "../modal-overlay/modal-overlay";

import styles from "./modal.module.css";

type TProps = {
  title?: string;
  onClose: () => void;
};

export const Modal: FC<TProps> = ({ title, onClose, children }) => {
  const modalsForPortal = useMemo(() => {
    return document.getElementById("modals");
  }, []);

  const handleClose = useCallback(
    (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleClose);

    return () => {
      document.removeEventListener("keydown", handleClose);
    };
  }, [handleClose]);

  return ReactDOM.createPortal(
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
    </ModalOverlay>,
    modalsForPortal!
  );
};
