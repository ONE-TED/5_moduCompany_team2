import { useState, useEffect } from 'react';
import { ITodo } from 'Store/types';

import useTaskContext from 'Hooks/useTaskContext';

// export interface Itodo {
//   id: number;
//   taskName: string;
//   stateId: number;
//   createdAt: string;
//   updatedAt: string;
//   dueDate: string;
// }

export interface IFilterItem {
  readonly filterName: string;
  readonly id: number;
  readonly targetId: number | null;
  toggleClick: boolean;
}

interface ITodoFilterProps {
  todos: ITodo[];
  filter: IFilterItem[];
}

export const useTodoFilter = ({
  todos = [],
  filter = [],
}: ITodoFilterProps) => {
  const [filterList, setFilterList] = useState(filter);
  const { state, dispatch } = useTaskContext();
  const [filterTodos, setFilterTodos] = useState(todos);

  useEffect(() => {
    setFilterTodos(state.selectedTask!.todos);
  }, [state]);

  const handleFilter = (filterItem: IFilterItem): void => {
    const nextFilterList = filterList.map((prefilterItem) =>
      filterItem.id === prefilterItem.id
        ? { ...prefilterItem, toggleClick: !prefilterItem.toggleClick }
        : { ...prefilterItem, toggleClick: false },
    );
    setFilterList(nextFilterList);

    if (filterItem.targetId === null) {
      setFilterTodos(todos);
    } else {
      setFilterTodos(
        todos.filter((todo) => todo.stateId === filterItem.targetId),
      );
    }
  };

  return {
    filterList,
    filterTodos,
    handleFilter,
  };
};
