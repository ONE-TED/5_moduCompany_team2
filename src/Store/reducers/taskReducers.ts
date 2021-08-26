import * as types from 'Store/actions/actionTypes';
import { TaskListState } from 'Store/types';
import { TaskAction } from 'Store/actions/taskActions';

const taskReducer = (
  state: TaskListState,
  action: TaskAction,
): TaskListState => {
  switch (action.type) {
    case types.SET_TODO_TASK:
      return {
        ...state,
        taskList: action.payload,
      };

    case types.DELETE_TODO_TASK:
      return {
        ...state,
        taskList: state.taskList.filter(
          (item) => item.taskDueDate !== action.payload,
        ),
      };

    default:
      return state;
  }
};

export default taskReducer;
