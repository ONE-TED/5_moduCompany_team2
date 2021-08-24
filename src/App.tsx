import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { GlobalStyles } from 'Styles/GlobalStyles';
import { theme } from 'Styles/theme';
import Button from 'Components/Button';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledButton>click</StyledButton>
    </ThemeProvider>
  );
};

export default App;

const StyledButton = styled(Button)`
  background-color: hotpink;
`;
