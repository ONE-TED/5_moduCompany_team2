import { useContext } from 'react';

import { TaskContext } from 'Store/taskProvider';
import { TaskContextType } from 'Store/types';

export default function useTaskContext(): TaskContextType {
  const { state, dispatch } = useContext<TaskContextType>(TaskContext);

  return {
    state,
    dispatch,
  };
}
