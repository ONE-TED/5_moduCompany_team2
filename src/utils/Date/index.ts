enum Days {
  Sunday,
  Monday,
  Tuesday,
  Wednseday,
  Thursday,
  Friday,
  Saturday,
}

enum Month {
  Jan,
  Feb,
  Mar,
  Apr,
  May,
  June,
  July,
  Aug,
  Sep,
  Oct,
  Nov,
  Dec,
}

export const getCurrentDateString = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  const day = today.getDay();

  return `${Days[day]}, ${date} ${Month[month]} ${year}`;
};

export const getDayMonthYear = (otherDate: Date = new Date()): string => {
  const year = otherDate.getFullYear();
  const month = otherDate.getMonth() + 1;
  const date = otherDate.getDate();

  return `${year}-${month >= 10 ? month : '0' + month}-${
    date >= 10 ? date : '0' + date
  }`;
};
