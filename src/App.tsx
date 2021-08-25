import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { GlobalStyles } from 'Styles/GlobalStyles';
import { theme } from 'Styles/theme';
import Button from 'Components/Button';
import TodoList from 'Components/TodoList';
import { task } from 'utils/MockData/data';

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
