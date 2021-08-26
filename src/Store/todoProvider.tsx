import React, { useReducer, useEffect } from 'react';

import { TaskState, ITask } from 'Store/types';
import todoReducer from 'Store/reducers/todoReducer';
import { TodoContextType } from 'Store/types';
import { todoStorage } from 'utils/storage';

const initialState: TaskState = {
  selectedTask: null,
};

export const TodoContext = React.createContext<TodoContextType | null>(null);

export const TodoProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    if (state.selectedTask) {
      const taskList = todoStorage.load();
      const selectedTask = state.selectedTask;
      taskList.map((item: ITask) =>
        item.taskDueDate === selectedTask?.taskDueDate ? selectedTask : item,
      );
      todoStorage.save(taskList);
    }
  }, [state]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
