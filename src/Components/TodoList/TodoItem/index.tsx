import React from 'react';
import styled from 'styled-components';

import { ReactComponent as CheckIcon } from 'Assets/icon/ic_check.svg';
import { ReactComponent as DeleteIcon } from 'Assets/icon/ic_delete.svg';
import Button from 'Components/Button';
import { ITodoTypes } from 'Components/TodoList';

interface IProps {
  todo: ITodoTypes;
  checkedId: number[];
  handleCheckedId(stateId: number): void;
  setDragItemId: {
    grabItem: (id: number) => void;
    interSectItem: (id: number) => void;
  };
  switchStateData: () => void;
  clickElId: { current: number | null };
  interSectElId: { current: number | null };
  lastLeaveTarget: { current: HTMLDivElement | null };
}
interface IObjectIndex {
  [key: number]: string;
}

const STATUS = [
  {
    id: 0,
    state: '시작안함',
  },
  {
    id: 1,
    state: '진행중',
  },
  {
    id: 2,
    state: '완료',
  },
];

const STATUS_CLASS_NAME: IObjectIndex = {
  0: 'todo',
  1: 'in-progress',
  2: 'done',
};
const TodoItem: React.FC<IProps> = ({
  todo,
  checkedId,
  handleCheckedId,
  setDragItemId,
  switchStateData,
  interSectElId,
  clickElId,
  lastLeaveTarget,
}) => {
  const handleDelete = (): void => {
    console.log(todo.id, '지워질 아이디');
  };
  const updateState = (): void => {
    console.log(todo.id, todo.stateId);
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
    switchStateData();
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
        <CheckIconWrapper onClick={() => handleCheckedId(todo.stateId)}>
          {checkedId.includes(todo.stateId) && <CheckIcon />}
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
        <DeleteIcon onClick={handleDelete} />
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
  height: 56px;
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
  transition: 0.6s;
  &.move_up {
    margin-bottom: 14px;
  }
  &.move_down {
    margin-top: 14px;
  }
`;
const StatusButton = styled(Button)`
  width: 56px;
  height: 20px;
  &:hover {
    opacity: 0.9;
  }
  &.todo {
    background-color: ${({ theme }) => theme.colors.primary};
  }
  &.done {
    background-color: ${({ theme }) => theme.colors.green};
  }
  &.in-progress {
    background-color: ${({ theme }) => theme.colors.lighter};
    color: ${({ theme }) => theme.colors.gray};
  }
`;
const Text = styled.span`
  display: inline-block;
  font-size: 1em;
  color: ${({ theme }) => theme.colors.white};
`;
