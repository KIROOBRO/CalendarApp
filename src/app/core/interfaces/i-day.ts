import { IEvent } from './i-event';

export interface IDay {
  date: string;
  dayOfMonth: number;
  isToday: boolean;
  isNotInThisMonth: boolean;
  event?: IEvent;
}
