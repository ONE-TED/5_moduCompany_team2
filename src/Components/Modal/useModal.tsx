import React, { useState } from 'react';
import Modal from 'Components/Modal';

import styled from 'styled-components';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [visible, setVisible] = useState(false);

  const open = () => {
    setIsOpen(true);
    setTimeout(() => {
      setVisible(true);
    }, 0);
  };
  const close = () => {
    setIsClosing(false);
    setIsOpen(false);
    setVisible(false);
  };

  const willClose = () => {
    setIsClosing(true);
  };

  const modalRender = (
    component: JSX.Element,
  ): JSX.Element | JSX.Element[] | boolean => {
    return (
      isOpen && (
        <Modal>
          <ModalDimmer onClick={() => willClose()}></ModalDimmer>
          {component}
        </Modal>
      )
    );
  };
  return {
    open,
    close,
    modalRender,
    isClosing,
    willClose,
    visible,
  };
};

export default useModal;

const ModalDimmer = styled.div`
  position: fixed;
  left: 0;
  top: 100px;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100vw;
  height: 100vh;
  z-index: 9997;
`;
