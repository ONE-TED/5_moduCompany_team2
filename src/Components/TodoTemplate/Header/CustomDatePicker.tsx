import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import styled from 'styled-components';

import 'react-datepicker/dist/react-datepicker.css';
import { ReactComponent as CalendarIcon } from 'Assets/icon/ic_calendar.svg';

const CustomDatePicker = forwardRef(
  (
    props: React.DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    const convertDateFormat = (dateString: string): string => {
      const regex = /\d{4}-(\d{2}-\d{2})/;
      const regArr = regex.exec(dateString);
      if (!regArr) {
        return '';
      }
      return regArr[1].replace('-', '/');
    };

    return (
      <Wrapper type="button" {...props} ref={ref}>
        {props.value ? (
          convertDateFormat(props.value as string)
        ) : (
          <StyledCalendarIcon />
        )}
      </Wrapper>
    );
  },
);

CustomDatePicker.displayName = 'CustomDatePickerComponent';
export default CustomDatePicker;

const Wrapper = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.darkLine};
  padding: 0 14px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.formBg};
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.darkBg};
    & > svg {
      fill-opacity: 1;
    }
  }
`;

const StyledCalendarIcon = styled(CalendarIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  fill: ${({ theme }) => theme.colors.white};
  fill-opacity: 0.54;
  transform: translate(-50%, -50%);
  transition: fill-opacity 0.2s ease-in-out;
  pointer-events: none;
`;
