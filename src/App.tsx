import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { GlobalStyles } from 'Styles/GlobalStyles';
import { theme } from 'Styles/theme';
import Button from 'Components/Button';
import TodoList from 'Components/TodoList';

const App: React.FC = () => {
  const [todoData, setTodoData] = useState(task[0].todos);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledButton>click</StyledButton>
      <TodoList setTodoData={setTodoData} data={todoData} />
    </ThemeProvider>
  );
};

export default App;

const StyledButton = styled(Button)`
  background-color: hotpink;
`;

const task = [
  {
    taskDueDate: '2021-08-24',
    todos: [
      {
        id: 1521837244,
        taskName: '1 쓰기',
        stateId: 1, // 여기 stateId로 바뀌였어요!
        createdAt: '2021-02-03',
        updatedAt: '2021-07-07',
        dueDate: '2021-08-24',
      },
      {
        id: 2521872464,
        taskName: '2',
        stateId: 0, // 여기 stateId로 바뀌였어요!
        createdAt: '2021-02-03',
        updatedAt: '2021-07-07',
        dueDate: '2021-08-24',
      },
      {
        id: 3521857274,
        taskName: '3',
        stateId: 2, // 여기 stateId로 바뀌였어요!
        createdAt: '2021-02-03',
        updatedAt: '2021-07-07',
        dueDate: '2021-08-24',
      },
      {
        id: 15421687244,
        taskName: '4 쓰기',
        stateId: 1, // 여기 stateId로 바뀌였어요!
        createdAt: '2021-02-03',
        updatedAt: '2021-07-07',
        dueDate: '2021-08-24',
      },
      {
        id: 25241877264,
        taskName: '5',
        stateId: 0, // 여기 stateId로 바뀌였어요!
        createdAt: '2021-02-03',
        updatedAt: '2021-07-07',
        dueDate: '2021-08-24',
      },
      {
        id: 35231878274,
        taskName: '6',
        stateId: 2, // 여기 stateId로 바뀌였어요!
        createdAt: '2021-02-03',
        updatedAt: '2021-07-07',
        dueDate: '2021-08-24',
      },
      {
        id: 1521827244,
        taskName: '7 쓰기',
        stateId: 1, // 여기 stateId로 바뀌였어요!
        createdAt: '2021-02-03',
        updatedAt: '2021-07-07',
        dueDate: '2021-08-24',
      },
      {
        id: 2521687264,
        taskName: '8',
        stateId: 0, // 여기 stateId로 바뀌였어요!
        createdAt: '2021-02-03',
        updatedAt: '2021-07-07',
        dueDate: '2021-08-24',
      },
      {
        id: 3521877274,
        taskName: '9',
        stateId: 2, // 여기 stateId로 바뀌였어요!
        createdAt: '2021-02-03',
        updatedAt: '2021-07-07',
        dueDate: '2021-08-24',
      },
      {
        id: 152187244,
        taskName: '10 쓰기',
        stateId: 1, // 여기 stateId로 바뀌였어요!
        createdAt: '2021-02-03',
        updatedAt: '2021-07-07',
        dueDate: '2021-08-24',
      },
      {
        id: 2528187264,
        taskName: '11',
        stateId: 0, // 여기 stateId로 바뀌였어요!
        createdAt: '2021-02-03',
        updatedAt: '2021-07-07',
        dueDate: '2021-08-24',
      },
      {
        id: 3521879274,
        taskName: '12',
        stateId: 2, // 여기 stateId로 바뀌였어요!
        createdAt: '2021-02-03',
        updatedAt: '2021-07-07',
        dueDate: '2021-08-24',
      },
    ],
  },
];
