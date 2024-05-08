import { Moment } from 'moment';

export interface IEvent {
  id: number;
  name: string;
  start_date: Moment;
  end_date: Moment;
  is_holiday: boolean;
}
