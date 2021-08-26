import React from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root') as HTMLElement;

const Modal: React.FC = ({ children }) => {
  return createPortal(children, modalRoot);
};

export default Modal;
