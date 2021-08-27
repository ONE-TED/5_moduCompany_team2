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
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  padding: 7px 12px;
  font-size: 14px;
  min-width: 34px;
  font-weight: bold;
  margin-left: 8px;
  ${({ toggleClick, theme }) =>
    toggleClick
      ? css`
          color: ${theme.colors.white};
          background-color: ${theme.colors.primary};
        `
      : css`
          color: ${theme.colors.primary};
          background-color: transparent;
        `};
`;

export default FilterButton;
