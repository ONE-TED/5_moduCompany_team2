import React from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
  onClick: () => void;
}

const Button: React.FC<Props> = ({ children, ...restProps }) => {
  return (
    <StyledButton type="button" {...restProps}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};
`;
