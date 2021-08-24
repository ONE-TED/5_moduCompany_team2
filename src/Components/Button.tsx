import React from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
}

const Button: React.FC<Props> = ({ className, children }) => {
  return <StyledButton className={className}>{children}</StyledButton>;
};

export default Button;

const StyledButton = styled.button`
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.orange};
`;
