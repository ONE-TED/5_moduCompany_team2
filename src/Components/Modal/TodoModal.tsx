import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import TodoFilter from 'Components/TodoFilter';
import { useTodoFilter } from 'Components/TodoFilter/useTodoFilter';
import TodoList from 'Components/TodoList';
import useTaskContext from 'Hooks/useTaskContext';

interface IProps {
  isClosing: boolean;
  close: () => void;
}

const initValueFilterList = [
  {
    filterName: '전체',
    id: 0,
    targetId: null,
    toggleClick: true,
  },
  {
    filterName: '시작안함',
    id: 1,
    targetId: 0,
    toggleClick: false,
  },
  {
    filterName: '진행중',
    id: 2,
    targetId: 1,
    toggleClick: false,
  },
  {
    filterName: '완료',
    id: 3,
    targetId: 2,
    toggleClick: false,
  },
];

const TodoModal: React.FC<IProps> = ({ isClosing, close }) => {
  const [visible, setVisible] = useState(false);
  const { state, dispatch } = useTaskContext();
  const { filterList, filterTodos, handleFilter } = useTodoFilter({
    todos: state.selectedTask!.todos,
    filter: initValueFilterList,
  });
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
      <TodoFilter filterList={filterList} handleFilter={handleFilter} />
      <ul>
        <li>TodoItem일괄선택으로 수정 ?</li>
        <li>삭제 전체삭제로 변경 ?</li>
      </ul>
      <div>TodoList</div>
      <div>left Item : {state.selectedTask?.todos.length}</div>
      <TodoList filterTodos={filterTodos} />
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
  z-index: 9998;
  & > * {
    padding-bottom: 24px;
  }
  ${({ visible }) => (visible ? 'transform: translate(-100%);' : '')}
  ${({ isClosing }) => (isClosing ? 'transform: translate(100%);' : '')}
`;

export default TodoModal;
