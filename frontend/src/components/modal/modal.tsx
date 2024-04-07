import { FC, useEffect } from "react";
import ReactDOM from "react-dom";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import modal from "./modal.module.css";
import { IModalProps } from "../../utils/types";
import { IKeyboardEvent } from "../../utils/types";

const modalRoot: HTMLElement | null = document.getElementById("react-modals");

export const Modal: FC<IModalProps> = ({ children, onClose }) => {
  useEffect(() => {
    const closeByEscape = (event: IKeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, [onClose]);

  return (
    modalRoot &&
    ReactDOM.createPortal(
      <>
        <div className={modal.container}>{children}</div>
        <ModalOverlay onClose={onClose} />
      </>,
      modalRoot
    )
  );
};
