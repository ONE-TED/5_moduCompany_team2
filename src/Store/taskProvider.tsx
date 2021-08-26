import React, { useReducer, useEffect } from 'react';

import { TaskState } from 'Store/types';
import taskReducer from 'Store/reducers/taskReducers';
import { TaskContextType } from 'Store/types';
import { todoStorage } from 'utils/storage';
import { setTaskItem } from 'Store/actions/taskActions';

const initialState: TaskState = {
  taskList: todoStorage.load() || [],
  selectedTask: null,
};

export const TaskContext = React.createContext<TaskContextType | null>(null);

export const TaskProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    todoStorage.save(state.taskList);
    console.log(state);
  }, [state]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
