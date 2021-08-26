import { useContext } from 'react';

import { TodoContext } from 'Store/todoProvider';
import { TaskContextType, TodoContextType } from 'Store/types';

export default function useTodoContext(): TodoContextType {
  // TODO type 알아내기..
  const { state, dispatch } = useContext<any>(TodoContext);

  return {
    state,
    dispatch,
  };
}
