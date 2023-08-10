import React from 'react';
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay({onClickOverlay}) {
  return ( 
    <div className={styles.overlay} onClick={onClickOverlay}></div>
  )
}

export default ModalOverlay;

ModalOverlay.propTypes = {onClickOverlay: PropTypes.func.isRequired,};

