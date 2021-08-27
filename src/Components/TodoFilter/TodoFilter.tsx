import React, { useState, useEffect } from 'react';
import { IFilterItem } from './useTodoFilter';
import style from 'styled-components';
import FilterButton from 'Components/TodoFilter/FilterButton';
import useTaskContext from 'Hooks/useTaskContext';

interface IFilterProps {
  filterList: IFilterItem[];
  handleFilter: (filterItem: IFilterItem) => void;
}

const TodoFilter: React.FC<IFilterProps> = ({ filterList, handleFilter }) => {
  const { state, dispatch } = useTaskContext();

  return (
    <TodoFilterWrapper>
      {filterList.map((filterItem) => (
        <FilterButton
          key={filterItem.id}
          toggleClick={filterItem.toggleClick}
          onClick={() => handleFilter(filterItem)}
        >
          {filterItem.filterName}
        </FilterButton>
      ))}
    </TodoFilterWrapper>
  );
};

const TodoFilterWrapper = style.div`
  width: 100%;
  min-width: 260px;
  flex-wrap : nowrap;
`;
export default TodoFilter;
