import React, { useState } from 'react';
import styled from 'styled-components';
import { TodoTypes } from 'Components/TodoList/index';
import Button from 'Components/Button';
import { ReactComponent as DeleteIcon } from 'Assets/icon/ic_delete.svg';
import { ReactComponent as CheckIcon } from 'Assets/icon/ic_check.svg';
interface Props {
  todo: TodoTypes;
  checkedId: number[];
  handleCheckedId(id: number): void;
}
interface ObjetIndexTypes {
  [key: number]: string;
}
const STATUS: ObjetIndexTypes = {
  0: '완료',
  1: '진행중',
  2: '시작안함',
};
const STATUS_CLASS_NAME: ObjetIndexTypes = {
  0: 'done',
  1: 'in-progress',
  2: 'todo',
};
const TodoItem: React.FC<Props> = ({ todo, checkedId, handleCheckedId }) => {
  const handleDelete = (id: number): void => {
    console.log(id, '지워질 아이디');
  };
  return (
    <Container draggable>
      <LSide>
        <CheckIconWrapper onClick={() => handleCheckedId(todo.id)}>
          {checkedId.includes(todo.id) && <CheckIcon />}
        </CheckIconWrapper>
        <Text>{todo.taskName}</Text>
      </LSide>
      <RSide>
        <StatusButton className={STATUS_CLASS_NAME[todo.status]}>
          {STATUS[todo.status]}
        </StatusButton>
        <DeleteIcon onClick={() => handleDelete(todo.id)} />
      </RSide>
    </Container>
  );
};

export default TodoItem;

const LSide = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
`;
const RSide = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
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
  margin-right: 8px;
  position: relative;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  & > svg {
    position: absolute;
    left: 10px;
    top: 10px;
  }
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 56px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.strongDarkBg};
  border-bottom: 1px solid #fff;
  & div {
    margin: 10px;
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
