import React from 'react';
import styled from 'styled-components';

import Header from 'Components/Layout/Header';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <StyledMain>
        <StyledSection>{children}</StyledSection>
      </StyledMain>
    </>
  );
};

export default Layout;

const StyledMain = styled.main`
  min-height: 100vh;
  padding-top: 100px;
`;

const StyledSection = styled.section``;
