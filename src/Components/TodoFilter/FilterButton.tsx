import React from 'react';
import styled, { css } from 'styled-components';
import Button from 'Components/Button';

interface filterButtonProps {
  toggleClick: boolean;
  onClick?: () => void;
}

const FilterButton: React.FC<filterButtonProps> = ({
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

const StyledFilterButton = styled(Button)<filterButtonProps>`
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
