import React from 'react';
import styled from 'styled-components';

import { ReactComponent as LogoIcon } from 'Assets/icon/ic_logo.svg';
import { getCurrentDateString } from 'utils/date';
import TodoCreator from 'Components/TodoCreator';

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <Container>
        <GnbLeft>
          <Logo>
            <LogoLink href="/">
              <span className="a11y">One-Ted</span>
              <StyledLogoIcon />
            </LogoLink>
          </Logo>
          <DateWrap>
            <StyledDate>{getCurrentDateString()}</StyledDate>
          </DateWrap>
        </GnbLeft>
        <TodoCreator />
      </Container>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.strongDarkBg};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 20;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  padding: 0 40px;
`;

const GnbLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Logo = styled.h1``;

const LogoLink = styled.a`
  display: block;
  padding: 10px 0;
`;

const StyledLogoIcon = styled(LogoIcon)`
  width: 103px;
  height: 33px;
`;

const DateWrap = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledDate = styled.time`
  display: block;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.lighter};
`;
