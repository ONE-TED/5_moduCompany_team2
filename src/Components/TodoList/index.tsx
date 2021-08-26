import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import { getElementIndex } from 'utils/DragNdrop';
import useTaskContext from 'Hooks/useTaskContext';
import { setTodos } from 'Store/actions/taskActions';
import TodoItem from 'Components/TodoList/TodoItem';
import { ITodo, ITask } from 'Store/types';

interface IProps {
  filterTodos: ITodo[];
}

const TodoList: React.FC<IProps> = ({ filterTodos: data }) => {
  const { dispatch } = useTaskContext();
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
  const lastLeaveTarget = useRef<HTMLDivElement | null>(null);
  const setDragItemId = {
    grabItem: (id: number): void => {
      clickElId.current = getElementIndex(data, id);
    },
    interSectItem: (id: number): void => {
      interSectElId.current = getElementIndex(data, id);
    },
  };
  const sortStateData = (): ITodo[] => {
    const updateData = [...data];
    const clickedItemData = updateData[clickElId.current];
    updateData.splice(clickElId.current, 1); //자르고
    updateData.splice(interSectElId.current, 0, clickedItemData);
    console.log(updateData);
    return updateData;
  };
  const switchStateData = (): void => {
    // setTodoData([...sortStateData()]);
    console.log(data);
    dispatch(setTodos(sortStateData()));
  };
  //drag n drop
  return (
    <Wrapper>
      {data &&
        data.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            checkedId={checkedId}
            handleCheckedId={handleCheckedId}
            setDragItemId={setDragItemId}
            switchStateData={switchStateData}
            interSectElId={interSectElId}
            clickElId={clickElId}
            lastLeaveTarget={lastLeaveTarget}
          ></TodoItem>
        ))}
    </Wrapper>
  );
};

export default TodoList;

const Wrapper = styled.div``;
