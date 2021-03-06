import React from 'react';
import styled from 'styled-components';
import TodoFilter from 'Components/TodoTemplate/TodoFilter';
import { useTodoFilter } from 'Components/TodoTemplate/TodoFilter/useTodoFilter';
import TodoList from 'Components/TodoTemplate/TodoList';
import useTaskContext from 'Hooks/useTaskContext';
import { setSelectedTask } from 'Store/actions/taskActions';

interface IProps {
  isClosing: boolean;
  close: () => void;
  visible: boolean;
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

const TodoModal: React.FC<IProps> = ({ isClosing, close, visible }) => {
  // const [visible, setVisible] = useState(false);
  const { state, dispatch } = useTaskContext();
  const { filterList, filterTodos, handleFilter } = useTodoFilter({
    todos: state.selectedTask!.todos,
    filter: initValueFilterList,
  });
  // useEffect(() => {
  //   setVisible(true);
  //   // return () => setVisible(false);
  // }, []);

  const handleClose = () => {
    if (isClosing) {
      dispatch(setSelectedTask({ taskDueDate: '', todos: [] }));
      // setVisible(false);
      close();
    }
  };

  return (
    <Container
      onTransitionEnd={() => handleClose()}
      visible={visible}
      isClosing={isClosing}
    >
      <h2 className="a11y">{state.selectedTask?.taskDueDate} 할일 목록</h2>
      <Title>{state.selectedTask?.taskDueDate}</Title>
      <TodoFilter filterList={filterList} handleFilter={handleFilter} />
      <TodoList filterTodos={filterTodos} />
      <TodoFooter>
        <span>Left</span>
        <span>{filterTodos.length}</span>
      </TodoFooter>
    </Container>
  );
};

const Container = styled.article<{ visible: boolean; isClosing: boolean }>`
  position: fixed;
  left: 100%;
  top: 0;
  width: 30%;
  min-width: 300px;
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

const Title = styled.div`
  color: white;
  font-size: 20px;
  font-weight: 600;
`;
const TodoFooter = styled.div`
  /* position: absolute; */
  display: flex;
  justify-content: space-between;
  /* top: 90%; */
  margin-top: 15px;
  padding: 10px 0;
  /* margin: 10px 10px 0 10px; */
  border-top: 1px solid ${({ theme }) => theme.colors.darkLine};
  & span {
    display: inline-block;
    font-size: 16px;
    color: white;
  }
`;

export default TodoModal;
