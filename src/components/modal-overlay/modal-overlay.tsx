import { FC } from "react";

import styles from "./modal-overlay.module.css";

type TProps = {
  onClose: () => void;
};

export const ModalOverlay: FC<TProps> = ({ onClose, children }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      {children}
    </div>
  );
};
