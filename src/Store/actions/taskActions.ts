import * as types from 'Store/actions/actionTypes';

import { ITask } from 'Store/types';

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

export type TaskAction =
  | ReturnType<typeof setTaskItem>
  | ReturnType<typeof deleteTaskItem>;
