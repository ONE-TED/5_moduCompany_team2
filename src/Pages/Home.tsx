import React from 'react';

import TodoTemplate from 'Components/TodoTemplate';
import TodoSection from 'Components/TodoTemplate/TodoSection';
import useModal from 'Components/Modal/useModal';
import TodoModal from 'Components/Modal/Todo/TodoModal';

const Home: React.FC = () => {
  const { open, close, modalRender, isClosing, visible } = useModal();
  return (
    <TodoTemplate>
      <TodoSection open={open} />
      {modalRender(
        <TodoModal
          visible={visible}
          close={close}
          isClosing={isClosing}
        ></TodoModal>,
      )}
    </TodoTemplate>
  );
};
export default Home;
