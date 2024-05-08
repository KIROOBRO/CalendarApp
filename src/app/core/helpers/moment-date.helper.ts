import * as _moment from 'moment';
import { Moment } from 'moment';

import { IEvent } from '../interfaces/i-event';

const moment = _moment;

export class MomentDateHelper {
  public static isDateToday(date: Date): boolean {
    return moment(date).startOf('day').isSame(this.getCurrentDate());
  }

  public static isDateBefore(startDate: Moment, endDate: Moment): boolean {
    return moment(startDate).isBefore(endDate);
  }

  public static isDateInThisMonth(
    date: Moment,
    startOfMonth: Moment,
    endOfMonth: Moment,
  ): boolean {
    return (
      date.isSameOrAfter(startOfMonth, 'month') &&
      date.isSameOrBefore(endOfMonth, 'month')
    );
  }

  public static getCurrentDate(format = 'YYYY-MM-DD'): string {
    return moment().format(format);
  }

  public static getStartPreviousMonth(date: string): string {
    return moment(date).subtract(1, 'months').format('YYYY-MM-DD');
  }

  public static getStartDateInCurrentMonth(date: string): Moment {
    return moment(date).startOf('month').startOf('week');
  }

  public static getStartDateInCurrentMonthForView(date: string): Moment {
    return moment(date).startOf('month');
  }

  public static getEndDateInCurrentMonthForView(date: string): Moment {
    return moment(date).endOf('month');
  }

  public static getEndDateInCurrentMonth(date: string): Moment {
    return moment(date).endOf('month').endOf('week');
  }

  public static getStartPreviousWeek(date: string): string {
    return moment(date).subtract(1, 'weeks').format('YYYY-MM-DD');
  }

  public static getNextMonthPeriod(date: string): string {
    return moment(date).add(1, 'months').format('YYYY-MM-DD');
  }

  public static getNextWeekPeriod(date: string): string {
    return moment(date).add(1, 'weeks').format('YYYY-MM-DD');
  }

  public static getStartOfWeek(date: string): Moment {
    return moment(date).startOf('week');
  }

  public static getEndOfWeek(date: string): Moment {
    return moment(date).endOf('week');
  }

  public static getDaysBetweenDates({
    start_date,
    end_date,
  }: IEvent): string[] {
    const dates = [];

    while (start_date.isSameOrBefore(end_date)) {
      dates.push(start_date.format('YYYY-MM-DD'));
      start_date.add(1, 'days');
    }

    return dates;
  }
}
