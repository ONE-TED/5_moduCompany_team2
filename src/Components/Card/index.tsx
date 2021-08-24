import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

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

// interface IDays {
//   0: 'SUN';
//   1: 'MON';
//   2: 'TUE';
//   3: 'WED';
//   4: 'THU';
//   5: 'FRI';
//   6: 'SAT';
// }

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

const Card: React.FC<CardProps> = ({ todoItems }) => {
  const RADIUS = 54;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  const barRef = useRef<SVGCircleElement>(null);

  const doneTodoItems = todoItems.filter((item) => item.status === 2);
  const percent = (doneTodoItems.length / todoItems.length) * 100;

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
        <svg width="136" height="136" viewBox="0 0  136 136">
          <FrameCircle cx="68" cy="68" r="54" strokeWidth="11.5" />
          <BarCircle cx="68" cy="68" r="54" strokeWidth="11.5" ref={barRef} />
        </svg>
        <ContentInCircle>
          <strong>{`${month}/${date} ${DAYS[day]}`}</strong>
          {/* <br /> */}
          <strong>{`${percent.toFixed(0)}%`}</strong>
        </ContentInCircle>
        {/* <br />
        <strong>{`${percent.toFixed(0)}%`}</strong> */}
      </CircleProgressWrapper>
      <CardBox></CardBox>
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
  top: 68px;
  left: -28px;
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
  width: 136px;
  height: 136px;
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
  width: 136px;
  height: 136px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  strong {
    text-align: center;
    color: ${(props) => props.theme.colors.white};
    font-size: 16px;
    margin: 1px 0;
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
