import * as types from 'Store/actions/actionTypes';

import { ITask, ITodo } from 'Store/types';

export const setTaskItem = (payload: ITask[]) => {
  // const assertion - type 속성을 타입추론 시 활용할 수 있게 하기 위함
  return <const>{
    type: types.SET_TODO_TASK,
    payload,
  };
};

export const deleteTaskItem = (payload: ITask['taskDueDate']) => {
  return <const>{
    type: types.DELETE_TODO_TASK,
    payload,
  };
};

export const setSelectedTask = (payload: ITask) => {
  return <const>{
    type: types.SET_SELECTED_TASK,
    payload,
  };
};

export const setTodoItemState = (id: ITodo['id'], state: ITodo['stateId']) => {
  return <const>{
    type: types.SET_TODO_ITEM_STATE,
    payload: {
      id,
      state,
    },
  };
};

export const setTodos = (payload: ITodo[]) => {
  return <const>{
    type: types.SET_TODOS,
    payload,
  };
};

export const deleteTodoItem = (payload: ITodo['id']) => {
  return <const>{
    type: types.DELETE_TODO_ITEM,
    payload,
  };
};

export type TaskAction =
  | ReturnType<typeof setTaskItem>
  | ReturnType<typeof deleteTaskItem>
  | ReturnType<typeof setSelectedTask>
  | ReturnType<typeof setTodoItemState>
  | ReturnType<typeof deleteTodoItem>
  | ReturnType<typeof setTodos>;
