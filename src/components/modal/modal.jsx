import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect } from "react";
import styles from "./modal.module.css";
import ModalOverlay from "../modalOverlay/modalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
const modalRoot = document.querySelector("#root");

function Modal(props) {
  
  useEffect(() => {
    function handleEscClose(event) {
      if (event.key === "Escape") {
        props.onClose();
      }
    }
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);
  
  function handleOverlayClose(event) {
    if (event.currentTarget === event.target) {
      props.onClose();
    }
  }

  return (
    ReactDOM.createPortal(
      (<ModalOverlay onClickOverlay={handleOverlayClose}>
        <div className={styles.modal}>
          {props.children}
          <div className={`${styles.btnClose} mt-15 mr-10`} onClick={props.onClose} id="close-icon">
            <CloseIcon type="primary" />
          </div>
        </div>
      </ModalOverlay>
      ),
      modalRoot
    )
  )

}

export default Modal;

