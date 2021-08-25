import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

interface IToast {
  className?: string;
  isShow: boolean;
  message: string;
}

type StyleProps = {
  isShow?: boolean;
  opacity?: number;
  transform?: string;
};

const Toast: React.FC<IToast> = ({ className, isShow, message }) => {
  const [render, setRender] = useState<boolean>(false);

  useEffect(() => {
    isShow && setRender(isShow);
  }, [isShow]);

  return (
    <>
      {render &&
        createPortal(
          <Wrapper
            className={className}
            open={render}
            role="alertdialog"
            aria-live="assertive"
            aria-labelledby="toastTitle"
          >
            <Container isShow={isShow} onTransitionEnd={() => setRender(false)}>
              <Message id="toastTitle">{message}</Message>
            </Container>
          </Wrapper>,
          document.body,
        )}
    </>
  );
};

export default Toast;

const Wrapper = styled.dialog`
  position: fixed;
  bottom: 38px;
  left: 50%;
  width: 470px;
  border: 0;
  transform: translateX(-50%);
  z-index: 10000;
`;
const Container = styled.div.attrs<StyleProps>(({ isShow }) => ({
  opacity: isShow ? 1 : 0,
  transform: isShow ? 'none' : 'translateY(30px)',
}))<StyleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.colors.formBg};
  transform: ${({ transform }) => transform};
  opacity: ${({ opacity }) => opacity};
  transition: opacity 0.3s ease 0s, transform 0.3s ease 0s;
`;
const Message = styled.h2`
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;
