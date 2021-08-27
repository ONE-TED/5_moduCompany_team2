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

  const handleFilter = (filterItem: IFilterItem): void => {
    const nextFilterList = filterList.map((prefilterItem) =>
      filterItem.id === prefilterItem.id
        ? { ...prefilterItem, toggleClick: true }
        : { ...prefilterItem, toggleClick: false },
    );
    setFilterList(nextFilterList);
  };

  const filterTodos = () => {
    const filterIndex = filterList.findIndex(
      (filterItem) => filterItem.toggleClick,
    );
    const filter = filterList[filterIndex];
    if (filter?.targetId == null) {
      return todos;
    } else {
      return todos.filter((todo) => todo.stateId === filter.targetId);
    }
  };

  return {
    filterList,
    filterTodos: filterTodos(),
    handleFilter,
  };
};
