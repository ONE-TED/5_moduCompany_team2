import React, { useState, useRef } from 'react';
import TodoItem from 'Components/TodoList/TodoItem';
import styled from 'styled-components';
import { getElementIndex } from 'utils/DragNdrop';

export interface TodoTypes {
  id: number;
  taskName: string;
  stateId: number;
  createdAt: string;
  updatedAt: string;
  dueDate: string;
}

// export interface DataTypes {
//   // taskDueDate: string;
//   data: Array<TodoTypes>;
// }
interface Props {
  data: Array<TodoTypes>;
  setTodoData: (newState: Array<TodoTypes>) => void;
}

const TodoList: React.FC<Props> = ({ data, setTodoData }) => {
  const [checkedId, setCheckedId] = useState<number[]>([]); // 체크된 id 배열입니다 [1523,5342,2342]
  const handleCheckedId = (id: number): void => {
    if (!checkedId.includes(id)) {
      setCheckedId([...checkedId, id]);
    } else {
      setCheckedId([...checkedId.filter((checkedId) => checkedId !== id)]);
    }
  };
  //drag n drop
  const interSectElId = useRef<number>(-1);
  const clickElId = useRef<number>(-1);
  const setDragItemId = {
    grabItem: (id: number): void => {
      clickElId.current = getElementIndex(data, id);
    },
    interSectItem: (id: number): void => {
      interSectElId.current = getElementIndex(data, id);
    },
  };
  const sortStateData = (): Array<TodoTypes> => {
    const updateData = [...data];
    const grapedItem = updateData[clickElId.current];
    updateData.splice(clickElId.current, 1); //자르고
    updateData.splice(interSectElId.current, 0, grapedItem);
    return updateData;
  };
  const switchStateData = (): void => {
    setTodoData([...sortStateData()]);
  };
  //drag n drop
  return (
    <Wrapper>
      {data &&
        data.map((todo) => (
          <TodoItem
            key={todo.stateId}
            todo={todo}
            checkedId={checkedId}
            handleCheckedId={handleCheckedId}
            setDragItemId={setDragItemId}
            switchStateData={switchStateData}
          ></TodoItem>
        ))}
    </Wrapper>
  );
};

export default TodoList;

const Wrapper = styled.div``;
