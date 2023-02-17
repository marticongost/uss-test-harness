export const weekdayAbbr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const monthAbbr = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const millisecondsInADay = 24 * 60 * 60 * 1000;

export function offsetDays(date, days) {
  return new Date(date.getTime() + millisecondsInADay * days);
}

// Return the day of the week, from 0 (Monday) to 6 (Sunday)
function getDayOfWeek(date) {
  const day = date.getDay();
  return day == 0 ? 6 : day - 1;
}

export function getCalendarRows(year, month) {
  const firstDateOfMonth = new Date(year, month - 1, 1);
  const startingDate = offsetDays(
    new Date(year, month - 1, 1),
    -getDayOfWeek(firstDateOfMonth)
  );
  const rows = [];
  let currentRow;
  let currentDate = startingDate;

  while (true) {
    if (!currentRow) {
      currentRow = [];
      rows.push(currentRow);
    }
    currentRow.push(currentDate);
    currentDate = offsetDays(currentDate, 1);
    if (currentRow.length == 7) {
      if (currentDate.getMonth() + 1 > month) {
        break;
      }
      currentRow = null;
    }
  }

  return rows;
}

export class FlexibleDate {}

export class Anytime extends FlexibleDate {
  toString() {
    return "Anytime";
  }
}

export const anytime = new Anytime();

export class Month {
  constructor(year, month) {
    this.year = year;
    this.month = month;
  }

  toString() {
    return `${monthAbbr[this.month - 1]} ${this.year}`;
  }
}

export class SingleDate {
  constructor(year, month, day) {
    this.year = year;
    this.month = month;
    this.day = day;
  }

  toString() {
    return `${this.day} ${monthAbbr[this.month - 1]} ${this.year}`;
  }
}

export class DateRange {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  toString() {
    return `${this.start} to ${this.end}`;
  }
}
