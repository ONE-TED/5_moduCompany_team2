import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

import { ReactComponent as DeleteIcon } from 'Assets/icon/ic_delete.svg';
import greenBullet from 'Assets/images/green-bullet.png';
import redBullet from 'Assets/images/red-bullet.png';
import blueBullet from 'Assets/images/blue-bullet.png';
interface TodoTypes {
  id: number;
  taskName: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  dueDate: string;
}

interface CardProps {
  todoItems: TodoTypes[];
  // children: React.ReactNode;
}

interface Map {
  [key: string]: string;
}

const STATUS: Map = {
  0: '완료',
  1: '진행중',
  2: '시작안함',
};

const DAYS: Map = {
  0: 'SUN',
  1: 'MON',
  2: 'TUE',
  3: 'WED',
  4: 'THU',
  5: 'FRI',
  6: 'SAT',
};

const circleMeasurement = {
  STROKEWIDTH: 12,
  RADIUS: 69,
};

const Card: React.FC<CardProps> = ({ todoItems }) => {
  const { STROKEWIDTH, RADIUS } = circleMeasurement;
  const CIRCUMFERENCE = 2 * Math.PI * (RADIUS - STROKEWIDTH / 2);

  const barRef = useRef<SVGCircleElement>(null);

  const countTodosByStatus = Array(3)
    .fill(0)
    .map((_, index) => {
      return todoItems.filter((item) => item.status === index).length;
    });
  countTodosByStatus.reverse();

  // console.log(countTodosByStatus);

  const percent = (countTodosByStatus[0] / todoItems.length) * 100;

  const dateObject: Date = new Date(todoItems[0].dueDate);
  const month: number = dateObject.getMonth() + 1;
  const date: number = dateObject.getDate();
  const day: string = dateObject.getDay().toString();

  useEffect(() => {
    // console.log(todoItems);

    function showProgress(per: number): void {
      const progress = per / 100;
      const dashoffset = CIRCUMFERENCE * (1 - progress);

      if (barRef && barRef.current) {
        barRef.current.style.strokeDashoffset = dashoffset.toString();
        barRef.current.style.strokeDasharray = CIRCUMFERENCE.toString();
        // console.log(barRef.current);
      }
    }

    showProgress(percent);
  }, []);

  return (
    <CardWrapper>
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
        <DeleteButton>
          <DeleteIcon />
        </DeleteButton>
        <SummaryOfTodos>
          {countTodosByStatus.map((count, i) => (
            <li key={STATUS[String(i)]}>{`${STATUS[String(i)]} : ${count}`}</li>
          ))}
        </SummaryOfTodos>
      </CardBox>
    </CardWrapper>
  );
};

export default Card;

const CardWrapper = styled.div.attrs(() => ({
  tabIndex: '0',
}))`
  position: relative;
  cursor: pointer;
`;

const CardBox = styled.div`
  position: absolute;
  top: 69px;
  left: -27px;
  width: 192px;
  height: 226px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 4px;
  background: ${(props) => props.theme.colors.strongDarkBg};

  ${CardWrapper}:hover & {
    background: ${(props) => props.theme.colors.strongDarkBgHover};
  }

  ${CardWrapper}:focus & {
    background: ${(props) => props.theme.colors.strongDarkBgHover};
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
    color: ${(props) => props.theme.colors.white};
    font-size: 18px;
    margin: 1px 0;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  right: 6px;
  top: 16px;

  /* svg path {
    fill: ${(props) => props.theme.colors.primary};
  } */

  &:hover {
    svg path {
      fill: ${(props) => props.theme.colors.primary};
    }
  }
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
    color: ${(props) => props.theme.colors.green};
    list-style-image: ${`url(${greenBullet})`};
  }
  li:nth-child(2) {
    color: ${(props) => props.theme.colors.blue};
    list-style-image: ${`url(${blueBullet})`};
  }
  li:nth-child(3) {
    color: ${(props) => props.theme.colors.red};
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
  stroke: ${(props) => props.theme.colors.green};
  stroke-linecap: round;
`;

const FrameCircle = styled.circle.attrs(({ cx, cy, r, strokeWidth }) => ({
  cx,
  cy,
  r,
  strokeWidth,
}))`
  fill: ${(props) => props.theme.colors.strongDarkBg};
  stroke: #e6e6e6;

  ${CardWrapper}:hover & {
    fill: ${(props) => props.theme.colors.strongDarkBgHover};
  }

  ${CardWrapper}:focus & {
    fill: ${(props) => props.theme.colors.strongDarkBgHover};
  }
`;
