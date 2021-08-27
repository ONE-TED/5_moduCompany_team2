import { useContext } from 'react';

import { TaskContext } from 'Store/taskProvider';
import { TaskContextType } from 'utils/Types';

export default function useTaskContext(): TaskContextType {
  const { state, dispatch } = useContext<TaskContextType>(TaskContext);

  return {
    state,
    dispatch,
  };
}
