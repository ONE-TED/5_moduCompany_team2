import React from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from 'Styles/GlobalStyles';
import { theme } from 'Styles/theme';

import Home from 'Pages/Home';

const App: React.FC = () => {
  // const [todoData, setTodoData] = useState(task[0].todos);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Home />
    </ThemeProvider>
  );
};

export default App;
