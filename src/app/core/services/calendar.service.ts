import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { MomentDateHelper } from '../helpers/moment-date.helper';
import { IEvent } from '../interfaces/i-event';

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

  public saveSlot(event: IEvent): void {
    const test = MomentDateHelper.getDaysBetweenDates(event);

    test.forEach((el: string) => {
      const value = [...(this.eventMap.get(el) || []), event];

      this.eventMap.set(el, value);
    });

    this.eventsSubject.next(this.eventMap);
    localStorage.setItem(
      this.storageKey,
      JSON.stringify([...this.eventMap.entries()]),
    );
  }

  public updateSlot(slotId: number, newSlot: any): void {
    // const slots = this.getSlots();
    // const index = slots.findIndex((slot) => slot.id === slotId);
    // if (index !== -1) {
    //   slots[index] = newSlot;
    //   localStorage.setItem(this.storageKey, JSON.stringify(slots));
    // }
  }

  public deleteSlot(slotId: number): void {
    // let slots = this.getSlots();
    // slots = slots.filter((slot) => slot.id !== slotId);
    // localStorage.setItem(this.storageKey, JSON.stringify(slots));
  }
}
