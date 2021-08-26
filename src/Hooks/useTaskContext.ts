import { useContext } from 'react';

import { TaskContext } from 'Store/taskProvider';
import { TaskContextType } from 'Store/types';

export default function useTaskContext(): TaskContextType {
  // TODO type 알아내기..
  const { state, dispatch } = useContext<any>(TaskContext);

  return {
    state,
    dispatch,
  };
}
