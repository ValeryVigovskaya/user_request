import { FC } from "react";
import modalOverlay from "./modal-overlay.module.css";
import { IModalOverlayProps } from "../../utils/types";

export const ModalOverlay: FC<IModalOverlayProps> = ({ onClose }) => {
  return <div className={modalOverlay.overlay} onClick={onClose}></div>;
};
