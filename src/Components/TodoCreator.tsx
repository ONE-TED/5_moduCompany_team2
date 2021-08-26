import React, { useCallback, useState, useRef } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';

import { ReactComponent as PlusIcon } from 'Assets/icon/ic_plus.svg';
import { todoStorage } from 'utils/storage';
import { getDayMonthYear } from 'utils/date';
import { setSelectedTask, setTaskItem } from 'Store/actions/taskActions';
import { ITodo, ITask } from 'Store/types';
import useToast from 'Hooks/useToast';
import useTaskContext from 'Hooks/useTaskContext';
import Toast from 'Components/Toast';
import Input from 'Components/Input';
import Button from 'Components/Button';
import CustomDatePicker from 'Components/CustomDatePicker';

const TodoCreator: React.FC = () => {
  const { state, dispatch } = useTaskContext();
  const [todoText, setTodoText] = useState<string>('');
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const { isShow, message, toast } = useToast();

  const inputRef = useRef<HTMLInputElement>(null);
  const datePickerRef = useRef<any>(null); // type 모르겠음
  const handleDateChange = useCallback((date: Date): void => {
    setTargetDate(date);
  }, []);

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTodoText(e.target.value);
    },
    [],
  );

  const handleClick = useCallback(() => {
    //TODO Refactoring
    if (!todoText) {
      toast('할일을 입력해주세요.');
      inputRef.current?.focus();
      return;
    }

    if (!targetDate) {
      toast('목표 날짜를 입력해주세요.');
      datePickerRef.current?.setFocus();
      return;
    }

    const dueDate: string = getDayMonthYear(targetDate);
    const todo: ITodo = {
      id: Date.now(),
      taskName: todoText,
      stateId: 0,
      createdAt: getDayMonthYear(),
      updatedAt: getDayMonthYear(),
      dueDate,
    };
    const task = todoStorage.load();
    const findTaskItem = task.find(
      (item: ITask) => item.taskDueDate === dueDate,
    ); //TODO
    const newTaskItem = findTaskItem
      ? findTaskItem
      : { taskDueDate: dueDate, todos: [] };
    newTaskItem.todos.push(todo);
    if (findTaskItem) {
      task.map((item: ITask) =>
        item.taskDueDate === newTaskItem.taskDueDate ? newTaskItem : item,
      );
    } else {
      task.push(newTaskItem);
    }

    task.sort((a: ITask, b: ITask) => {
      const aDate = new Date(a.taskDueDate);
      const bDate = new Date(b.taskDueDate);
      if (aDate < bDate) {
        return 1;
      } else if (aDate > bDate) {
        return -1;
      } else {
        return 0;
      }
    });
    console.log(newTaskItem);
    dispatch(setTaskItem(task));
    if (newTaskItem.taskDueDate === state.selectedTask?.taskDueDate) {
      dispatch(setSelectedTask(newTaskItem));
    }
    setTargetDate(null);
    setTodoText('');
    toast('등록되었습니다.');
  }, [todoText, targetDate]);

  const handleEntered = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.keyCode === 13 && handleClick();
  };

  return (
    <Wrapper>
      <h2 className="a11y">Todo 작성</h2>
      <StyledInput
        value={todoText}
        ref={inputRef}
        aria-label="todo 입력 창"
        placeholder="Write todo"
        onChange={handleTextChange}
        onKeyDown={handleEntered}
      />
      <DatePickerWrap>
        <DatePicker
          ref={datePickerRef}
          selected={targetDate}
          dateFormat="yyyy-MM-dd"
          minDate={new Date()}
          customInput={
            <CustomDatePicker aria-label="todo 목표 날짜 입력 버튼" />
          }
          onChange={handleDateChange}
        />
      </DatePickerWrap>
      <StyledButton onClick={handleClick} aria-label="todo 입력 버튼">
        <StyledPlusIcon />
      </StyledButton>
      <Toast isShow={isShow} message={message} />
    </Wrapper>
  );
};

export default TodoCreator;

const Wrapper = styled.section`
  display: flex;
  align-items: center;
`;

const StyledInput = styled(Input)`
  margin-right: 8px;
`;

const DatePickerWrap = styled.div`
  position: relative;
  width: 70px;
  margin-right: 8px;
`;

const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const StyledPlusIcon = styled(PlusIcon)`
  transform: translateY(15%);
  pointer-events: none;
`;
