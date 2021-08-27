import { IObjectIndex } from 'utils/Types';

export const STATUS = [
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

export const DAYS: IObjectIndex = {
  0: 'SUN',
  1: 'MON',
  2: 'TUE',
  3: 'WED',
  4: 'THU',
  5: 'FRI',
  6: 'SAT',
};

export const STATUS_CLASS_NAME: IObjectIndex = {
  0: 'todo',
  1: 'in-progress',
  2: 'done',
};

export const CIRCLE_MEASUREMENT = {
  STROKEWIDTH: 12,
  RADIUS: 69,
};
