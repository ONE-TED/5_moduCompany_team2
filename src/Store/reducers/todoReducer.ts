import * as types from 'Store/actions/actionTypes';
import { TaskState } from 'Store/types';
import { TodoAction } from 'Store/actions/todoActions';

const todoReducer = (state: TaskState, action: TodoAction): TaskState => {
  switch (action.type) {
    case types.SET_SELECTED_TASK:
      return {
        ...state,
        selectedTask: action.payload,
      };

    case types.SET_TODO_ITEM_STATE:
      return {
        ...state,
        selectedTask: {
          taskDueDate: state.selectedTask!.taskDueDate,
          todos: state.selectedTask!.todos.map((item) => {
            if (item.id === action.payload.id) {
              item.stateId = action.payload.state;
            }
            return item;
          }),
        },
      };

    case types.DELETE_TODO_ITEM:
      return {
        ...state,
        selectedTask: {
          taskDueDate: state.selectedTask!.taskDueDate,
          todos: state.selectedTask!.todos.filter(
            (item) => item.id !== action.payload,
          ),
        },
      };
    default:
      return state;
  }
};

export default todoReducer;
