import React from 'react';
import styles from './Modal.module.css';
import ReactDOM from 'react-dom';

const Backdrop = (props) => {
  return <div className={styles.backdrop}></div>;
};

const ModalOverlay = ({ children }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

const portalElemnet = document.getElementById('overlays');

const Modal = ({ children }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portalElemnet)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElemnet,
      )}
    </>
  );
};
export default Modal;
