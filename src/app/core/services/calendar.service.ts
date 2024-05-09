import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { MomentDateHelper } from '../helpers/moment-date.helper';
import { IEvent } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private storageKey = 'calendar_events';
  private eventMap: Map<string, IEvent[]> = new Map<string, IEvent[]>();

  private eventsSubject: BehaviorSubject<Map<string, IEvent[]>> =
    new BehaviorSubject<Map<string, IEvent[]>>(this.eventMap);

  public get getEvents(): Observable<Map<string, IEvent[]>> {
    return this.eventsSubject.asObservable();
  }

  public initCalendarData(): void {
    this.eventMap = localStorage.getItem(this.storageKey)
      ? new Map<string, IEvent[]>(
          JSON.parse(localStorage.getItem(this.storageKey) || ''),
        )
      : new Map<string, IEvent[]>();

    this.eventsSubject.next(this.eventMap);
  }

  public addEvent(event: IEvent): void {
    const daysBetweenDates = MomentDateHelper.getDaysBetweenDates(event);

    daysBetweenDates.forEach((el: string) => {
      const value = [...(this.eventMap.get(el) || []), event];

      this.eventMap.set(el, value);
    });

    this.eventsSubject.next(this.eventMap);
    this.setItemInLocalStorage();
  }

  public editEvent(event: IEvent, eventDate: string): void {
    const updatedEventMap =
      this.eventMap
        .get(eventDate)
        ?.map((el) => (el.id === event.id ? event : el)) || [];

    this.eventMap.set(eventDate, updatedEventMap);
    this.eventsSubject.next(this.eventMap);
    this.setItemInLocalStorage();
  }

  public deleteEvent(eventId: number, eventDate: string): void {
    const updatedEventMap =
      this.eventMap.get(eventDate)?.filter((el) => el.id !== eventId) || [];

    this.eventMap.set(eventDate, updatedEventMap);
    this.eventsSubject.next(this.eventMap);
    this.setItemInLocalStorage();
  }

  private setItemInLocalStorage(): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify([...this.eventMap.entries()]),
    );
  }
}
