import React from 'react';
import { filterItem } from './useTodoFilter';
import style from 'styled-components';
import FilterButton from 'Components/TodoFilter/FilterButton';

interface FilterProps {
  filterList: filterItem[];
  handleFilter: (filterItem: filterItem) => void;
}

const TodoFilter: React.FC<FilterProps> = ({ filterList, handleFilter }) => {
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
  display : flex;
  justify-content : space-between;
`;
export default TodoFilter;
