import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

interface IProps {
  isClosing: boolean;
  close: () => void;
}

const TodoModal: React.FC<IProps> = ({ isClosing, close }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleClose = () => {
    if (isClosing) {
      close();
    }
  };

  return (
    <Container
      onTransitionEnd={() => handleClose()}
      visible={visible}
      isClosing={isClosing}
    >
      <div>2021-08-23</div>
      <ul>
        <li>TodoItem일괄선택으로 수정 ?</li>
        <li>삭제 전체삭제로 변경 ?</li>
      </ul>
      <div>TodoList</div>
      <div>left Item : 3</div>
    </Container>
  );
};

const Container = styled.div<{ visible: boolean; isClosing: boolean }>`
  position: fixed;
  left: 100%;
  top: 0;
  width: 30%;
  height: calc(100% - 100px);
  margin-top: 100px;
  background-color: ${({ theme }) => theme.colors.strongDarkBg};
  padding: 24px;
  transition-property: all;
  transition-duration: 0.5s;
  & > * {
    padding-bottom: 24px;
  }
  ${({ visible }) => (visible ? 'transform: translate(-100%);' : '')}
  ${({ isClosing }) => (isClosing ? 'transform: translate(100%);' : '')}
`;

export default TodoModal;
