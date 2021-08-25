import React, { forwardRef } from 'react';
import styled from 'styled-components';

import { ReactComponent as WriteIcon } from 'Assets/icon/ic_write.svg';

interface Props {
  className?: string;
  value: string;
  placeholder: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref: React.Ref<HTMLInputElement>;
}

const Input: React.FC<Props> = forwardRef(
  ({ className, ...restProps }, ref: React.Ref<HTMLInputElement>) => {
    return (
      <Wrapper className={className}>
        <StyledInput {...restProps} ref={ref} />
        <Icon />
      </Wrapper>
    );
  },
);

Input.displayName = 'customInputComponent';
export default Input;

const Wrapper = styled.div`
  position: relative;
  width: 285px;
  height: 48px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.darkLine};
  padding: 0 14px 0 42px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.formBg};
  transition: background-color 0.2s ease-in-out;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.darkBg};

    & + svg {
      stroke-opacity: 1;
    }
  }

  &::placeholder {
    font-size: 16px;
    line-height: 1.4;
    color: ${({ theme }) => theme.colors.light};
  }
`;

const Icon = styled(WriteIcon)`
  position: absolute;
  top: 50%;
  left: 14px;
  width: 20px;
  height: 20px;
  stroke: ${({ theme }) => theme.colors.white};
  stroke-opacity: 0.54;
  transform: translateY(-50%);
  transition: stroke-opacity 0.2s ease-in-out;
`;
