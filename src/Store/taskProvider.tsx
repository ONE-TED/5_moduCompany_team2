import React, { useReducer, useEffect } from 'react';

import { TaskListState } from 'Store/types';
import taskReducer from 'Store/reducers/taskReducers';
import { TaskContextType } from 'Store/types';
import { todoStorage } from 'utils/storage';

const initialState: TaskListState = {
  taskList: [],
};

export const TaskContext = React.createContext<TaskContextType | null>(null);

export const TaskProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    todoStorage.save(state.taskList);
  }, [state]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
