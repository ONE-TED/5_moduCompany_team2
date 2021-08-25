import { useState } from 'react';

export type Itodo = {
  id: number;
  taskName: string;
  stateId: number;
  createdAt: string;
  updatedAt: string;
  dueDate: string;
};

export interface filterItem {
  readonly filterName: string;
  readonly id: number;
  readonly targetId: number | null;
  toggleClick: boolean;
}

interface todoFilterProps {
  todos: Itodo[];
  filter: filterItem[];
}

export const useTodoFilter = ({ todos = [], filter = [] }: todoFilterProps) => {
  const [filterList, setFilterList] = useState(filter);
  const [filterTodos, setFilterTodos] = useState(todos);

  const handleFilter = (filterItem: filterItem): void => {
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
