import * as types from 'Store/actions/actionTypes';
import { TaskState } from 'Store/types';
import { TaskAction } from 'Store/actions/taskActions';

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case types.SET_TODO_TASK:
      //날짜추가
      return {
        ...state,
        taskList: action.payload,
      };

    case types.DELETE_TODO_TASK:
      //카드삭제
      return {
        ...state,
        taskList: state.taskList.filter(
          (item) => item.taskDueDate !== action.payload,
        ),
      };

    case types.SET_SELECTED_TASK:
      //카드선택
      return {
        ...state,
        selectedTask: action.payload,
      };

    case types.SET_TODOS:
      //선택된 날짜 Todos변경
      console.log('reducer', action.payload);
      return {
        ...state,
        selectedTask: {
          taskDueDate: state.selectedTask!.taskDueDate,
          todos: action.payload,
        },
      };

    case types.SET_TODO_ITEM_STATE:
      //개별Todo아이템 상태변경 ?
      return {
        ...state,
        selectedTask: {
          taskDueDate: state.selectedTask!.taskDueDate,
          todos: state.selectedTask!.todos.map((item) => {
            if (item.id === action.payload.id) {
              let newStateId = action.payload.state as number;
              newStateId = (newStateId + 1) % 3;
              item.stateId = newStateId as 0 | 1 | 2;
            }
            return item;
          }),
        },
      };

    case types.DELETE_TODO_ITEM:
      //개별 Todo삭제
      // taskList : []
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

export default taskReducer;
