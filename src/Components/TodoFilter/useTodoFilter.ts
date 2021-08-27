import { useState } from 'react';
import { ITodo } from 'Store/types';

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

interface ITodoFilter {
  filterList: IFilterItem[];
  filterTodos: ITodo[];
  handleFilter: (filterItem: IFilterItem) => void;
}

export const useTodoFilter = ({
  todos = [],
  filter = [],
}: ITodoFilterProps): ITodoFilter => {
  const [filterList, setFilterList] = useState(filter);

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
