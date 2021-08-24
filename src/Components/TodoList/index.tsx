import React, { useState } from 'react';
import TodoItem from 'Components/TodoList/TodoItem';
import styled from 'styled-components';

export interface TodoTypes {
  id: number;
  taskName: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  dueDate: string;
}

interface Props {
  todos: Array<TodoTypes>;
}

const TodoList: React.FC<Props> = ({ todos }) => {
  const [checkedId, setCheckedId] = useState<number[]>([]); // 체크된 id 배열입니다 [1523,5342,2342]
  const handleCheckedId = (id: number): void => {
    if (!checkedId.includes(id)) {
      setCheckedId([...checkedId, id]);
    } else {
      setCheckedId([...checkedId.filter((checkedId) => checkedId !== id)]);
    }
  };
  return (
    <Wrapper>
      {todos &&
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            checkedId={checkedId}
            handleCheckedId={handleCheckedId}
          >
            List
          </TodoItem>
        ))}
    </Wrapper>
  );
};

export default TodoList;

const Wrapper = styled.div``;
