import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import { getElementIndex } from 'utils/DragNdrop';
import useTaskContext from 'Hooks/useTaskContext';
import { setTaskItem, setTodos } from 'Store/actions/taskActions';
import TodoItem from 'Components/TodoTemplate/TodoList/TodoItem';
import { ITodo } from 'utils/Types';
import { useEffect } from 'react';
import ConfirmModal from 'Components/Modal/Comfirm/ConfirmModal';

interface IProps {
  filterTodos: ITodo[];
}

const TodoList: React.FC<IProps> = ({ filterTodos: data }) => {
  const { state, dispatch } = useTaskContext();
  const [checkedId, setCheckedId] = useState<number[]>([]);
  const handleCheckedId = (id: number): void => {
    if (!checkedId.includes(id)) {
      setCheckedId([...checkedId, id]);
    } else {
      setCheckedId([...checkedId.filter((checkedId) => checkedId !== id)]);
    }
  };
  useEffect(() => {
    setCheckedId([]);
  }, [data]);

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
    updateData.splice(clickElId.current, 1);
    updateData.splice(interSectElId.current, 0, clickedItemData);
    return updateData;
  };
  const switchData = (): void => {
    dispatch(setTodos(sortStateData()));
  };

  const todoItemAllSelect = () => {
    if (checkedId.length > 0) {
      setCheckedId([]);
    } else {
      setCheckedId([...data.map((item) => item.id)]);
    }
  };
  const todoItemAllDelete = () => {
    const dueDate = state.selectedTask?.taskDueDate;

    const newTodos = state.selectedTask!.todos.filter((item) => {
      return !checkedId.includes(item.id);
    });

    const newTaskItem = state.taskList.map((task) => {
      task.taskDueDate === dueDate && (task.todos = newTodos);
      return task;
    });
    dispatch(setTaskItem(newTaskItem));
    dispatch(setTodos(newTodos));
  };
  return (
    <Wrapper todoCounts={data.length}>
      <ItemsDelete>
        <button onClick={todoItemAllSelect}>
          {checkedId.length > 0 ? `선택 해제` : '전체선택'}
        </button>
        <ConfirmModal
          message="정말 삭제하시겠습니까?"
          trigger={({ handleOpen }) => (
            <button
              type="button"
              disabled={checkedId.length === 0}
              onClick={handleOpen}
            >
              {checkedId.length} 개 삭제
            </button>
          )}
          cb={todoItemAllDelete}
        />
      </ItemsDelete>
      {data &&
        data.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            checkedId={checkedId}
            handleCheckedId={handleCheckedId}
            setDragItemId={setDragItemId}
            switchData={switchData}
            interSectElId={interSectElId}
            clickElId={clickElId}
            lastLeaveTarget={lastLeaveTarget}
          ></TodoItem>
        ))}
      {data.length === 0 && (
        <NonTodoItemsNoti>Todo가 없습니다.</NonTodoItemsNoti>
      )}
    </Wrapper>
  );
};

export default TodoList;

const Wrapper = styled.div<{ todoCounts: number }>`
  max-height: 500px;
  overflow-x: hidden;
  overflow-y: ${(props) => (props.todoCounts === 0 ? 'none' : 'scroll')};
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
  }
  &::-webkit-scrollbar-track {
    background-color: #2f3542;
  }
`;
const ItemsDelete = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 10px 0 10px;
  & button {
    color: white;
    font-size: 16px;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      font-weight: bold;
    }
  }
`;

const NonTodoItemsNoti = styled.div`
  margin: 39px 10px 0 10px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;
