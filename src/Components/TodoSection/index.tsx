import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Card from 'Components/Card';

import { todoStorage } from 'utils/storage';

import { ReactComponent as ArrowDownIcon } from 'Assets/icon/ic_arrow-down.svg';

interface ITodo {
  id: number;
  taskName: string;
  stateId: 0 | 1 | 2;
  createdAt: string;
  updatedAt: string;
  dueDate: string;
}

interface ITask {
  taskDueDate: string;
  todos: ITodo[];
}

const TodoSection: React.FC = () => {
  const [isAscending, setIsAscending] = useState<boolean>(false);
  const [allTasks, setAllTasks] = useState<ITask[]>(todoStorage.load() ?? []);

  const handleToggleSort = () => {
    const AllTasksForSort = JSON.parse(JSON.stringify(allTasks));

    if (isAscending) {
      AllTasksForSort.sort((a: ITask, b: ITask) => {
        return new Date(a.taskDueDate) < new Date(b.taskDueDate) ? 1 : -1;
      });
      setAllTasks(AllTasksForSort);
    } else {
      AllTasksForSort.sort((a: ITask, b: ITask) => {
        return new Date(a.taskDueDate) > new Date(b.taskDueDate) ? 1 : -1;
      });
      setAllTasks(AllTasksForSort);
    }

    setIsAscending(!isAscending);
  };

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
            <Card key={item.taskDueDate} todoItems={item.todos} />
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

const TodoListTitle = styled.h1`
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
