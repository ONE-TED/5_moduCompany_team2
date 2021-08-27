import React from 'react';
import styled from 'styled-components';

import TodoTemplate from 'Components/TodoTemplate';
import TodoSection from 'Components/TodoSection';
import useModal from 'Components/Modal/useModal';
import TodoModal from 'Components/Modal/TodoModal';

const Home: React.FC = () => {
  const { open, close, modalRender, isClosing, willClose } = useModal();
  return (
    <TodoTemplate>
      <TodoSection open={open} />
      {modalRender(<TodoModal close={close} isClosing={isClosing}></TodoModal>)}
    </TodoTemplate>
  );
};
export default Home;