import React, { useState } from 'react';
import Modal from 'Components/Modal';

import styled from 'styled-components';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const open = () => {
    setIsClosing(false);
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
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
  };
};

export default useModal;

const ModalDimmer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100vw;
  height: 100vh;
`;
