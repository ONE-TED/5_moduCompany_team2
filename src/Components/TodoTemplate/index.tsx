import React from 'react';
import styled from 'styled-components';

import Header from 'Components/TodoTemplate/Header';

const TodoTemplate: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <StyledMain>
        <StyledSection>{children}</StyledSection>
      </StyledMain>
    </>
  );
};

export default TodoTemplate;

const StyledMain = styled.main`
  min-height: 100vh;
  padding-top: 100px;
  background-color: ${({ theme }) => theme.colors.darkBg};
`;

const StyledSection = styled.section`
  width: 100%;
  max-width: 1200px;
  /* min-width: ???px; */
  padding: 26px 0;
  margin: 0 auto;
`;
