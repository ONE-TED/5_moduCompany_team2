import React from 'react';
import styled from 'styled-components';

const TodoModal: React.FC = () => {
  return (
    <Container>
      <div>2021-08-23</div>
      <div>filter</div>
      <ul>
        <li>TodoItem일괄선택으로 수정 ?</li>
        <li>삭제 전체삭제로 변경 ?</li>
      </ul>
      <div>TodoList</div>
      <div>left Item : 3</div>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  left: 70%;
  top: 0;
  width: 30%;
  height: calc(100% - 100px);
  margin-top: 100px;
  background-color: ${({ theme }) => theme.colors.strongDarkBg};
  padding: 24px;
  & > * {
    padding-bottom: 24px;
  }
`;

export default TodoModal;
