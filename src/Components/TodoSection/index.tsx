import React, { useState } from 'react';
import styled from 'styled-components';

import Card from 'Components/Card';
import useTaskContext from 'Hooks/useTaskContext';
import { ITask } from 'Store/types';
import { setTaskItem } from 'Store/actions/taskActions';
import { ReactComponent as ArrowDownIcon } from 'Assets/icon/ic_arrow-down.svg';

interface ITodoSectionProps {
  open: () => void;
}

const TodoSection: React.FC<ITodoSectionProps> = ({ open }) => {
  const {
    state: { taskList: allTasks },
    dispatch,
  } = useTaskContext();
  const [isAscending, setIsAscending] = useState<boolean>(false);
  // const [allTasks, setAllTasks] = useState<ITask[]>(taskList);

  const handleToggleSort = () => {
    const AllTasksForSort = allTasks;

    if (isAscending) {
      AllTasksForSort.sort((a: ITask, b: ITask) => {
        return new Date(a.taskDueDate) < new Date(b.taskDueDate) ? 1 : -1;
      });
    } else {
      AllTasksForSort.sort((a: ITask, b: ITask) => {
        return new Date(a.taskDueDate) > new Date(b.taskDueDate) ? 1 : -1;
      });
    }
    setTaskItem([...AllTasksForSort]);
    setIsAscending(!isAscending);
  };

  // const handleRemoveTodoList = (date: string): void => {
  //   if (confirm('정말로 삭제하시겠습니까?')) {
  //     const allTasksAfterRemoval = allTasks.filter(
  //       (task) => task.taskDueDate !== date,
  //     );
  //     setTaskItem(allTasksAfterRemoval);
  //     todoStorage.save(allTasksAfterRemoval);
  //   }
  // };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 24px',
          margin: '26px 0 54px',
        }}
      >
        <TodoListTitle>To Do List</TodoListTitle>
        <ToggleOrderByDateBtn onClick={handleToggleSort}>
          {isAscending ? (
            <>
              <ArrowDownIcon className="arrow_up" />
              <span>이전 날짜순</span>
            </>
          ) : (
            <>
              <ArrowDownIcon />
              <span>최근 날짜순</span>
            </>
          )}
        </ToggleOrderByDateBtn>
      </div>

      {allTasks.length > 0 ? (
        <StyledTodoList>
          {allTasks.map((item: ITask) => (
            <Card open={open} key={item.taskDueDate} item={item} />
          ))}
        </StyledTodoList>
      ) : (
        <EmptyTodoList>
          <p>입력한 투두 아이템이 없습니다</p>
        </EmptyTodoList>
      )}
    </>
  );
};

export default TodoSection;

const TodoListTitle = styled.h2`
  color: ${({ theme }) => theme.colors.white};
  font-size: 28px;
  line-height: 140%;
  font-weight: 500;
`;

const ToggleOrderByDateBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 126px;
  height: 48px;
  color: ${({ theme }) => theme.colors.white};
  background: #1f1d2b;
  border: 1px solid #393c49;
  box-sizing: border-box;
  border-radius: 8px;

  svg.arrow_up {
    transform: rotate(180deg);
  }
`;

const StyledTodoList = styled.div`
  /* display: flex;
  flex-flow: row wrap; */
  display: grid;
  /* grid-template-columns: repeat(5, 1fr); */
  grid-template-columns: repeat(auto-fill, minmax(240px, auto));
  justify-items: center;
`;

const EmptyTodoList = styled.div`
  width: 100%;
  height: 50vh;
  max-height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    color: ${({ theme }) => theme.colors.white};
    font-size: 28px;
  }
`;
