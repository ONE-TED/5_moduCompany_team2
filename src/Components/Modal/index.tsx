import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const modalRoot = document.querySelector('#modal-root') as HTMLElement;

const Modal: React.FC = ({ children }) => {
  return createPortal(children, modalRoot);
};

export default Modal;
