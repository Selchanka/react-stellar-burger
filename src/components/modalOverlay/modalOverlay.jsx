import React from 'react';
import styles from "./modalOverlay.module.css";


function ModalOverlay(props) {
  return ( 
    <div className={styles.overlay} onClick={props.onClickOverlay}>{props.children}</div>
  )
}

export default ModalOverlay;

