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
        id: 152187244,
        taskName: '자소서 쓰기',
        stateId: 1, // 여기 stateId로 바뀌였어요!
        createdAt: '2021-02-03',
        updatedAt: '2021-07-07',
        dueDate: '2021-08-24',
      },
      {
        id: 152187264,
        taskName: '밥먹기',
        stateId: 0, // 여기 stateId로 바뀌였어요!
        createdAt: '2021-02-03',
        updatedAt: '2021-07-07',
        dueDate: '2021-08-24',
      },
      {
        id: 152187274,
        taskName: '잘자기',
        stateId: 2, // 여기 stateId로 바뀌였어요!
        createdAt: '2021-02-03',
        updatedAt: '2021-07-07',
        dueDate: '2021-08-24',
      },
    ],
  },
];
