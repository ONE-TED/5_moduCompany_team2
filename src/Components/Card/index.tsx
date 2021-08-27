import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

import { ITask } from 'Store/types';
import useTaskContext from 'Hooks/useTaskContext';
import { deleteTaskItem } from 'Store/actions/taskActions';
import { setSelectedTask } from 'Store/actions/taskActions';
import greenBullet from 'Assets/images/green-bullet.png';
import redBullet from 'Assets/images/red-bullet.png';
import blueBullet from 'Assets/images/blue-bullet.png';
import DeleteButton from 'Components/DeleteButton';

interface CardProps {
  item: ITask;
  open: () => void;
}

interface Map {
  [key: string]: string;
}

const status = [
  {
    id: 0,
    state: '시작안함',
  },
  {
    id: 1,
    state: '진행중',
  },
  {
    id: 2,
    state: '완료',
  },
];

const DAYS: Map = {
  0: 'SUN',
  1: 'MON',
  2: 'TUE',
  3: 'WED',
  4: 'THU',
  5: 'FRI',
  6: 'SAT',
};

const CIRCLE_MEASUREMENT = {
  STROKEWIDTH: 12,
  RADIUS: 69,
};

const Card: React.FC<CardProps> = ({ item, open }) => {
  const { state, dispatch } = useTaskContext();
  const { selectedTask } = state;
  const { todos: todoItems, taskDueDate } = item;
  const { STROKEWIDTH, RADIUS } = CIRCLE_MEASUREMENT;
  const CIRCUMFERENCE = 2 * Math.PI * (RADIUS - STROKEWIDTH / 2);

  const barRef = useRef<SVGCircleElement>(null);

  const countTodosByStatus = Array(3)
    .fill(0)
    .map((_, index) => {
      return todoItems.filter((item) => item.stateId === index).length;
    });
  countTodosByStatus.reverse();

  const percent = isNaN((countTodosByStatus[0] / todoItems.length) * 100)
    ? 0
    : (countTodosByStatus[0] / todoItems.length) * 100;

  const dateObject: Date = new Date(taskDueDate);
  const month: number = dateObject.getMonth() + 1;
  const date: number = dateObject.getDate();
  const day: string = dateObject.getDay().toString();
  function showProgress(per: number): void {
    const progress = per / 100;
    const dashoffset = CIRCUMFERENCE * (1 - progress);

    if (barRef && barRef.current) {
      barRef.current.style.strokeDashoffset = dashoffset.toString();
      barRef.current.style.strokeDasharray = CIRCUMFERENCE.toString();
    }
  }
  useEffect(() => {
    showProgress(percent);
  }, [todoItems, percent]);

  const selectCard = () => {
    open();
    dispatch(setSelectedTask(item));
  };

  const handleRemoveTodoList = (
    e: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    e.stopPropagation();
    dispatch(deleteTaskItem(taskDueDate));
  };

  const handleEnterCard = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.keyCode === 13 && selectCard();
  };

  return (
    <CardWrapper
      onClick={selectCard}
      onKeyDown={handleEnterCard}
      role="button"
      tabIndex={0}
      aria-haspopup="true"
      aria-selected={taskDueDate === selectedTask?.taskDueDate}
    >
      <CircleProgressWrapper>
        <svg
          width={RADIUS * 2}
          height={RADIUS * 2}
          viewBox={`0 0 ${RADIUS * 2} ${RADIUS * 2}`}
        >
          <FrameCircle
            cx={RADIUS}
            cy={RADIUS}
            r={RADIUS - 6}
            strokeWidth={STROKEWIDTH}
          />
          <BarCircle
            cx={RADIUS}
            cy={RADIUS}
            r={RADIUS - 6}
            strokeWidth={STROKEWIDTH}
            ref={barRef}
          />
        </svg>
        <ContentInCircle>
          <strong>{`${month}/${date} ${DAYS[day]}`}</strong>
          <strong>{`${percent.toFixed(0)}%`}</strong>
        </ContentInCircle>
      </CircleProgressWrapper>
      <CardBox>
        <StyledDeleteButton onClick={handleRemoveTodoList} confirm />
        <SummaryOfTodos>
          {countTodosByStatus.map((count, i) => (
            <li key={status[status.length - 1 - i].state}>{`${
              status[status.length - 1 - i].state
            } : ${count}`}</li>
          ))}
        </SummaryOfTodos>
      </CardBox>
    </CardWrapper>
  );
};

export default React.memo(Card);

const CardBox = styled.div`
  position: absolute;
  top: 69px;
  left: -27px;
  width: 192px;
  height: 226px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.strongDarkBg};
  transition: background-color 0.2s;
`;

const FrameCircle = styled.circle.attrs(({ cx, cy, r, strokeWidth }) => ({
  cx,
  cy,
  r,
  strokeWidth,
}))`
  fill: ${({ theme }) => theme.colors.strongDarkBg};
  stroke: #e6e6e6;
  transition: fill 0.2s;
`;

const CardWrapper = styled.div`
  position: relative;
  cursor: pointer;
  margin-bottom: 200px;

  &:hover {
    ${CardBox} {
      background: ${({ theme }) => theme.colors.strongDarkBgHover};
    }

    ${FrameCircle} {
      fill: ${({ theme }) => theme.colors.strongDarkBgHover};
    }
  }

  ${CardBox} {
    background: ${(props) =>
      props['aria-selected']
        ? props.theme.colors.strongDarkBgHover
        : props.theme.colors.strongDarkBg};
  }

  ${FrameCircle} {
    fill: ${(props) =>
      props['aria-selected']
        ? props.theme.colors.strongDarkBgHover
        : props.theme.colors.strongDarkBg};
  }
`;

const CircleProgressWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 138px;
  height: 138px;
  z-index: 10;
  svg {
    transform: rotate(-90deg);
  }
`;

const ContentInCircle = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 138px;
  height: 138px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  strong {
    text-align: center;
    color: ${({ theme }) => theme.colors.white};
    font-size: 18px;
    margin: 1px 0;
  }
`;

const StyledDeleteButton = styled(DeleteButton)`
  position: absolute;
  right: 6px;
  top: 16px;
`;

const SummaryOfTodos = styled.ul`
  padding-top: 60px;
  padding-left: 16px;
  li {
    font-size: 14px;
    color: white;
    margin: 24px 0;
    margin-left: 16px;
  }

  li:nth-child(1) {
    color: ${({ theme }) => theme.colors.green};
    list-style-image: ${`url(${greenBullet})`};
  }
  li:nth-child(2) {
    color: ${({ theme }) => theme.colors.blue};
    list-style-image: ${`url(${blueBullet})`};
  }
  li:nth-child(3) {
    color: ${({ theme }) => theme.colors.red};
    list-style-image: ${`url(${redBullet})`};
  }
`;

const BarCircle = styled.circle.attrs(({ cx, cy, r, strokeWidth }) => ({
  cx,
  cy,
  r,
  strokeWidth,
}))`
  fill: none;
  stroke: ${({ theme }) => theme.colors.green};
  stroke-linecap: round;
`;
