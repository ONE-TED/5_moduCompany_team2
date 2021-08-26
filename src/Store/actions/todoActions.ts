import * as types from 'Store/actions/actionTypes';

import { ITask, ITodo } from 'Store/types';

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

export const deleteTodoItem = (payload: ITodo['id']) => {
  return <const>{
    type: types.DELETE_TODO_ITEM,
    payload,
  };
};

export type TodoAction =
  | ReturnType<typeof setSelectedTask>
  | ReturnType<typeof setTodoItemState>
  | ReturnType<typeof deleteTodoItem>;
