import React from 'react';
import styled from 'styled-components';

import { ReactComponent as CheckIcon } from 'Assets/icon/ic_check.svg';
import Button from 'Components/Commons/Button';
import { ITodo, ITask } from 'utils/Types';
import {
  deleteTodoItem,
  setTaskItem,
  setTodoItemState,
} from 'Store/actions/taskActions';
import useTaskContext from 'Hooks/useTaskContext';
import DeleteButton from 'Components/Commons/DeleteButton';
import { STATUS, STATUS_CLASS_NAME } from 'utils/Constants';

interface IProps {
  todo: ITodo;
  checkedId: number[];
  handleCheckedId(stateId: number): void;
  setDragItemId: {
    grabItem: (id: number) => void;
    interSectItem: (id: number) => void;
  };
  switchData: () => void;
  clickElId: { current: number | null };
  interSectElId: { current: number | null };
  lastLeaveTarget: { current: HTMLDivElement | null };
}

const TodoItem: React.FC<IProps> = ({
  todo,
  checkedId,
  handleCheckedId,
  setDragItemId,
  switchData,
  interSectElId,
  clickElId,
  lastLeaveTarget,
}) => {
  const { state, dispatch } = useTaskContext();

  const handleDelete = (): void => {
    if (state.selectedTask) {
      const selectedDate = state.selectedTask.taskDueDate;
      const findIndex = state.taskList.findIndex(
        (item) => item.taskDueDate === selectedDate,
      );
      const taskDueDate = state.selectedTask!.taskDueDate;
      const newTodos = state.selectedTask!.todos.filter(
        (item) => item.id !== todo.id,
      );
      const newTaskList: ITask[] = [...state.taskList];
      newTaskList[findIndex] = {
        taskDueDate: taskDueDate,
        todos: newTodos,
      };
      dispatch(setTaskItem(newTaskList));
      dispatch(deleteTodoItem(todo.id));
    }
  };

  const updateState = (): void => {
    if (state.selectedTask) {
      const selectedDate = state.selectedTask.taskDueDate;
      const findIndex = state.taskList.findIndex(
        (item) => item.taskDueDate === selectedDate,
      );
      const taskDueDate = state.selectedTask!.taskDueDate;
      const newTaskList: ITask[] = [...state.taskList];
      newTaskList[findIndex] = {
        taskDueDate: taskDueDate,
        todos: state.selectedTask!.todos,
      };
      dispatch(setTaskItem(newTaskList));
      dispatch(setTodoItemState(todo.id, todo.stateId)); // todos:[1212]
    }
  };
  const onDragStart = (e: React.DragEvent<HTMLDivElement>): void => {
    e.dataTransfer.effectAllowed = 'move';
    setDragItemId.grabItem(todo.id);
  };
  const moveUpAndDownClassName = (): string => {
    if (clickElId.current! < interSectElId.current!) {
      return 'move_up';
    } else if (clickElId.current! > interSectElId.current!) return 'move_down';
    return '';
  };
  const onDragEnter = (e: React.DragEvent<HTMLDivElement>): void => {
    const moveClassName = moveUpAndDownClassName();
    if (lastLeaveTarget.current)
      lastLeaveTarget.current!.classList.remove('move_down');
    const $target = e.target as HTMLDivElement;
    setDragItemId.interSectItem(todo.id);
    if (clickElId.current !== interSectElId.current && moveClassName)
      $target.classList.add(moveClassName);
    lastLeaveTarget.current = $target;
  };

  const onDragEnd = (e: React.DragEvent<HTMLDivElement>): void => {
    const $target = e.target as HTMLDivElement;
    $target.classList.remove('move_up');
    $target.classList.remove('move_down');
    if (lastLeaveTarget.current) {
      lastLeaveTarget.current!.classList.remove('move_up');
      lastLeaveTarget.current!.classList.remove('move_down');
    }
    switchData();
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    const $target = e.target as HTMLDivElement;
    $target.classList.remove('move_up');
  };
  return (
    <Container
      data-id={todo.id}
      draggable
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <LSide>
        <CheckIconWrapper onClick={() => handleCheckedId(todo.id)}>
          {checkedId.includes(todo.id) && <CheckIcon />}
        </CheckIconWrapper>
        <Text>{todo.taskName}</Text>
      </LSide>
      <RSide>
        <StatusButton
          onClick={updateState}
          className={STATUS_CLASS_NAME[todo.stateId]}
        >
          {STATUS[todo.stateId].state}
        </StatusButton>
        <DeleteButton onClick={handleDelete} />
      </RSide>
    </Container>
  );
};

export default TodoItem;

const LSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const RSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & > button {
    margin-right: 14px;
  }
  & svg {
    cursor: pointer;
  }
  & svg:hover {
    & path {
      fill: ${({ theme }) => theme.colors.red};
    }
  }
`;

const CheckIconWrapper = styled.div`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.white};
  width: 27px;
  height: 27px;
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  & > svg {
    width: 15px;
    height: 15px;
    position: absolute;
    left: 6px;
    top: 6px;
  }
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 68px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.strongDarkBg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkLine};
  &:hover {
    opacity: 0.9;
    cursor: grab;
  }
  & div {
    margin: 10px;
  }
  &.grap {
    background-color: ${({ theme }) => theme.colors.darkLine};
  }
  transition: 0.4s;
  &.move_up {
    margin-bottom: 18px;
  }
  &.move_down {
    margin-top: 18px;
  }
`;
const StatusButton = styled(Button)`
  width: 60px;
  height: 20px;
  &:hover {
    opacity: 0.9;
  }
  &.todo {
    background-color: ${({ theme }) => theme.colors.red};
  }
  &.done {
    background-color: ${({ theme }) => theme.colors.green};
  }
  &.in-progress {
    background-color: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};
  }
`;
const Text = styled.span`
  display: inline-block;
  font-size: 1em;
  min-width: 25px;
  max-width: 170px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.colors.white};
  @media screen and (max-width: 1200px) {
    max-width: 75px;
  }
`;
