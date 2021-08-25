import { useState } from 'react';

export interface Itodo {
  id: number;
  taskName: string;
  stateId: number;
  createdAt: string;
  updatedAt: string;
  dueDate: string;
}

export interface IFilterItem {
  readonly filterName: string;
  readonly id: number;
  readonly targetId: number | null;
  toggleClick: boolean;
}

interface ITodoFilterProps {
  todos: Itodo[];
  filter: IFilterItem[];
}

export const useTodoFilter = ({
  todos = [],
  filter = [],
}: ITodoFilterProps) => {
  const [filterList, setFilterList] = useState(filter);
  const [filterTodos, setFilterTodos] = useState(todos);

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
