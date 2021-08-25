import React, { useState } from 'react';
import Modal from 'Components/Modal';

import styled from 'styled-components';

interface IModal {
  component: JSX.Element | JSX.Element[];
}

const useModal = ({ component }: IModal) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  // const modalRender = (): JSX.Element | JSX.Element[] => {
  //   return <Modal>{isOpen && component}</Modal>
  const modalRender = (): JSX.Element | JSX.Element[] | boolean => {
    return (
      isOpen && (
        <Modal>
          <ModalDimmer onClick={() => close()}></ModalDimmer>
          {component}
        </Modal>
      )
    );
  };
  return {
    open,
    close,
    modalRender,
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
