import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import { useEffect } from "react";
import styles from "./modal.module.css";
import ModalOverlay from "../modalOverlay/modalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
const modalRoot = document.querySelector("#root");

function Modal({ children, onClose }) {
  
  useEffect(() => {
    function handleEscClose(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);
  
  function handleOverlayClose(event) {
    if (event.currentTarget === event.target) {
      onClose();
    }
  }

  return (
    ReactDOM.createPortal(      
      (<>      
        <div className={styles.modal}> 
          {children}
          <div className={`${styles.btnClose} mt-15 mr-10`} onClick={onClose} id="close-icon">
            <CloseIcon type="primary" />
          </div>
        </div>
        <ModalOverlay onClickOverlay={handleOverlayClose} /> 
      </>
      ),
      modalRoot
    )
  )

}

export default Modal;

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};