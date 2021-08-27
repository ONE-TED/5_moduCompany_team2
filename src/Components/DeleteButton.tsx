import React from 'react';
import styled from 'styled-components';

import ConfirmModal from 'Components/ConfirmModal';
import { ReactComponent as DeleteIcon } from 'Assets/icon/ic_delete.svg';

interface IDeleteButton {
  className?: string;
  cb: () => void;
}

const DeleteButton: React.FC<IDeleteButton> = ({ className, cb }) => {
  return (
    <ConfirmModal
      message="정말 삭제하시겠습니까?"
      trigger={({ handleOpen, isOpen }) => (
        <Wrapper
          type="button"
          className={className}
          aria-haspopup="true"
          aria-pressed={isOpen}
          aria-label="삭제 버튼"
          onClick={handleOpen}
        >
          <StyledDeleteIcon />
        </Wrapper>
      )}
      cb={() => console.log('삭제')}
    />
  );
};

export default DeleteButton;

const Wrapper = styled.button`
  &:hover > svg {
    fill: ${({ theme }) => theme.colors.primary};
  }
`;

const StyledDeleteIcon = styled(DeleteIcon)`
  fill: ${({ theme }) => theme.colors.white};
  transition: fill 0.2s ease;
  pointer-events: none;
`;
