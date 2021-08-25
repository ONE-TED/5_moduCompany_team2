import React from 'react';
import { IFilterItem } from './useTodoFilter';
import style from 'styled-components';
import FilterButton from 'Components/TodoFilter/FilterButton';

interface IFilterProps {
  filterList: IFilterItem[];
  handleFilter: (filterItem: IFilterItem) => void;
}

const TodoFilter: React.FC<IFilterProps> = ({ filterList, handleFilter }) => {
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
