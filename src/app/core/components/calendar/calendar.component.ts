import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Self,
  TrackByFunction,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, takeUntil } from 'rxjs';

import { ECalendarViewType } from '../../enums';
import { MomentDateHelper } from '../../helpers/moment-date.helper';
import { ICurrentWeek, IDay, IEvent } from '../../interfaces';
import { CalendarService } from '../../services/calendar.service';
import { NgOnDestroy } from '../../services/ng-on-destroy.service';
import { TCalendarViewType } from '../../types/t-calendar-view.type';
import { trackByFnById } from '../../utils/functions';

import { AddEditEventModalComponent } from './components/add-edit-event-modal/add-edit-event-modal.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { MOK_DAYS_IN_WEEK } from './constants/mok-days-in-week';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgOnDestroy],
})
export class CalendarComponent implements OnInit {
  public events$ = this.calendarService.getEvents;

  public ECalendarViewType = ECalendarViewType;
  public MOK_DAYS_IN_WEEK = MOK_DAYS_IN_WEEK;

  public viewType: TCalendarViewType = 'month';
  public viewDate = MomentDateHelper.getCurrentDate();
  public currentWeek: ICurrentWeek = {
    days: [],
  };

  public weeksInMonth: ICurrentWeek[] = [];

  public trackByFnEvents: TrackByFunction<IEvent> = trackByFnById;

  constructor(
    @Self() private readonly ngOnDestroy$: NgOnDestroy,
    private dialog: MatDialog,
    private alert: MatSnackBar,
    private calendarService: CalendarService,
  ) {}

  public trackByFnByIdx: TrackByFunction<string> = (idx: number) => idx;
  public trackByFnWeeks: TrackByFunction<ICurrentWeek> = (idx: number) => idx;
  public trackByFnDays: TrackByFunction<IDay> = (idx: number, item: IDay) =>
    item.date;

  ngOnInit(): void {
    this.calendarService.initCalendarData();
    this.generateCalendar();
  }

  public handlePrevious(): void {
    if (this.viewType === 'month') {
      this.viewDate = MomentDateHelper.getStartPreviousMonth(this.viewDate);
    } else if (this.viewType === 'week') {
      this.viewDate = MomentDateHelper.getStartPreviousWeek(this.viewDate);
    }

    this.generateCalendar();
  }

  public handleNext(): void {
    if (this.viewType === 'month') {
      this.viewDate = MomentDateHelper.getNextMonthPeriod(this.viewDate);
    } else if (this.viewType === 'week') {
      this.viewDate = MomentDateHelper.getNextWeekPeriod(this.viewDate);
    }

    this.generateCalendar();
  }

  public changeView(event: MatSlideToggleChange): void {
    this.viewType = event.checked
      ? ECalendarViewType.WEEK
      : ECalendarViewType.MONTH;

    this.generateCalendar();
  }

  public handleAddEditEvent(
    event: IEvent | null = null,
    eventDate: string | null = null,
  ): void {
    const dialogConfig = new MatDialogConfig<IEvent>();
    dialogConfig.autoFocus = false;
    dialogConfig.data = event;

    this.dialog
      .open(AddEditEventModalComponent, dialogConfig)
      .afterClosed()
      .pipe(filter(Boolean), takeUntil(this.ngOnDestroy$))
      .subscribe((res: IEvent) => {
        if (event) {
          this.calendarService.editEvent(res, eventDate as string);

          this.alert.open(
            'The event has been successfully edited!',
            'Success',
            {
              duration: 5000,
            },
          );
          return;
        }

        this.calendarService.addEvent(res);
        this.alert.open('The event has been successfully added!', 'Success', {
          duration: 5000,
        });
      });
  }

  public handleDeleteEvent(event: IEvent, eventDate: string): void {
    const dialogConfig = new MatDialogConfig<IEvent>();
    dialogConfig.autoFocus = false;
    dialogConfig.data = event;

    this.dialog
      .open(ConfirmModalComponent, dialogConfig)
      .afterClosed()
      .pipe(filter(Boolean), takeUntil(this.ngOnDestroy$))
      .subscribe(() => {
        this.calendarService.deleteEvent(event.id, eventDate);

        this.alert.open('The event has been successfully deleted!', 'Success', {
          duration: 5000,
        });
      });
  }

  private generateCalendar(): void {
    if (this.viewType === 'month') {
      this.generateMonthCalendar();
    } else if (this.viewType === 'week') {
      this.generateWeekCalendar();
    }
  }

  private generateMonthCalendar(): void {
    this.weeksInMonth = [];
    const startOfMonth = MomentDateHelper.getStartDateInCurrentMonth(
      this.viewDate,
    );
    const endOfMonth = MomentDateHelper.getEndDateInCurrentMonth(this.viewDate);
    const currentStartOfMonth =
      MomentDateHelper.getStartDateInCurrentMonthForView(this.viewDate);
    const currentEndOfMonth = MomentDateHelper.getEndDateInCurrentMonthForView(
      this.viewDate,
    );

    const date = startOfMonth.clone();

    while (MomentDateHelper.isDateBefore(date, endOfMonth)) {
      const week: ICurrentWeek = {
        days: [],
      };

      for (let i = 0; i < 7; i++) {
        week.days.push({
          date: date.format('YYYY-MM-DD'),
          dayOfMonth: date.date(),
          isToday: MomentDateHelper.isDateToday(date.toDate()),
          isNotInThisMonth: !MomentDateHelper.isDateInThisMonth(
            date,
            currentStartOfMonth,
            currentEndOfMonth,
          ),
        });
        date.add(1, 'day');
      }

      this.weeksInMonth.push(week);
    }
  }

  private generateWeekCalendar(): void {
    const startOfWeek = MomentDateHelper.getStartOfWeek(this.viewDate);
    const endOfWeek = MomentDateHelper.getEndOfWeek(this.viewDate);
    const date = startOfWeek.clone();
    this.currentWeek.days = [];

    while (MomentDateHelper.isDateBefore(date, endOfWeek)) {
      this.currentWeek.days.push({
        date: date.format('YYYY-MM-DD'),
        dayOfMonth: date.date(),
        isToday: MomentDateHelper.isDateToday(date.toDate()),
        isNotInThisMonth: false,
      });
      date.add(1, 'day');
    }
  }
}
