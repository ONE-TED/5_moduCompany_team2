import React, { useState, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';

interface ITriggerProps {
  handleOpen: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isOpen: boolean;
}

interface IConfirmModal {
  message: string;
  className?: string;
  trigger: React.FC<ITriggerProps>;
  cb: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ConfirmModal: React.FC<IConfirmModal> = ({
  trigger,
  message,
  className,
  cb,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpener, setModalOpener] = useState<Element | null>(null);
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleOpen = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setModalOpener(document.activeElement);
    setIsOpen(true);
    setTimeout(() => modalRef.current?.focus());
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    modalOpener && (modalOpener as HTMLElement).focus();
  }, [modalOpener]);

  const handleDimClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.target === e.currentTarget && handleClose();
  };

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    cb(e);
    handleClose();
  };

  const handleKeyTrap = useCallback((e: KeyboardEvent) => {
    if (!modalRef.current) {
      return;
    }
    const focusableNodeList = modalRef.current.querySelectorAll(
      '[href], [tabindex], button, input, textarea, select',
    );
    const shiftKey = e.shiftKey;
    const eventTarget = e.target;
    const firstFocusableNode = focusableNodeList[0];
    const lastFocusableNode = focusableNodeList[focusableNodeList.length - 1];
    const isFirstFocusableNode = Object.is(eventTarget, firstFocusableNode);
    const isLastFocusableNode = Object.is(eventTarget, lastFocusableNode);
    if (shiftKey && isFirstFocusableNode) {
      e.preventDefault();
      (lastFocusableNode as HTMLElement).focus();
    }
    if (!shiftKey && isLastFocusableNode) {
      e.preventDefault();
      (firstFocusableNode as HTMLElement).focus();
    }
  }, []);

  useEffect(() => {
    const keyListenerMap = new Map([
      [27, handleClose],
      [9, handleKeyTrap],
    ]);

    function handleKeyListener(e: KeyboardEvent): void {
      const listener = keyListenerMap.get(e.keyCode);
      typeof listener === 'function' && listener(e);
    }
    window.addEventListener('keydown', handleKeyListener);

    return () => {
      window.removeEventListener('keydown', handleKeyListener);
    };
  }, [handleClose, handleKeyTrap]);
  return (
    <>
      {typeof trigger === 'function' && trigger({ handleOpen, isOpen })}
      {isOpen &&
        createPortal(
          <Wrapper onClick={handleDimClose}>
            <StyledModal
              ref={modalRef}
              className={className}
              tabIndex={-1}
              aria-modal="true"
            >
              <Title>{message}</Title>
              <Content>
                <ConfirmButton type="button" onClick={handleConfirm}>
                  확인
                </ConfirmButton>
                <CancelButton type="button" onClick={handleClose}>
                  취소
                </CancelButton>
              </Content>
            </StyledModal>
          </Wrapper>,
          document.body,
        )}
    </>
  );
};

export default ConfirmModal;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10000;
`;

const StyledModal = styled.dialog`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 0;
  padding: 40px 32px;
  background-color: ${({ theme }) => theme.colors.formBg};
`;

const Title = styled.h2`
  display: block;
  width: 100%;
  margin-bottom: 16px;
  font-size: 18px;
  line-height: 1.555;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;

const Content = styled.div``;

const buttonMixin = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 296px;
  height: 55px;
  border-radius: 4px;
  padding: 0 14px;
  font-size: 18px;
  line-height: 1.555;
  font-weight: 700;
  transition: background-color 0.2s ease;

  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

const ConfirmButton = styled.button`
  ${buttonMixin};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;
const CancelButton = styled.button`
  ${buttonMixin};
  color: ${({ theme }) => theme.colors.formBg};
  background-color: ${({ theme }) => theme.colors.white};
  //background-color: #e0e2e7;
  &:hover {
    background-color: ${({ theme }) => theme.colors.light};
  }
`;
