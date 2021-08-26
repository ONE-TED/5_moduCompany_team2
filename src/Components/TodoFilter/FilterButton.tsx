import React from 'react';
import styled, { css } from 'styled-components';
import Button from 'Components/Button';

interface IFilterButtonProps {
  toggleClick: boolean;
  onClick?: () => void;
}

const FilterButton: React.FC<IFilterButtonProps> = ({
  toggleClick,
  children,
  ...restProps
}) => {
  return (
    <StyledFilterButton toggleClick={toggleClick} {...restProps}>
      {children}
    </StyledFilterButton>
  );
};

const StyledFilterButton = styled(Button)<IFilterButtonProps>`
  border: 1px solid ${({ theme }) => theme.colors.orange};
  border-radius: 3px;
  padding: 10px;
  font-weight: bold;
  ${({ toggleClick, theme }) =>
    toggleClick
      ? css`
          color: ${theme.colors.white};
          background-color: ${theme.colors.orange};
        `
      : css`
          color: ${theme.colors.orange};
          background-color: transparent;
        `};
`;

export default FilterButton;
