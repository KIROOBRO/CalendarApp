import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  Self,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { filter, takeUntil } from 'rxjs';

import { ECalendarViewType } from '../../enums/e-calendar-view-type';
import { MomentDateHelper } from '../../helpers/moment-date.helper';
import { ICurrentWeek } from '../../interfaces/i-current-week';
import { IEvent } from '../../interfaces/i-event';
import { CalendarService } from '../../services/calendar.service';
import { NgOnDestroy } from '../../services/ng-on-destroy.service';
import { TCalendarViewType } from '../../types/t-calendar-view.type';

import { AddEditEventModalComponent } from './components/add-edit-event-modal/add-edit-event-modal.component';
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

  public viewType: TCalendarViewType = 'month';
  public viewDate = MomentDateHelper.getCurrentDate();
  public currentWeek: ICurrentWeek = {
    days: [],
  };

  public MOK_DAYS_IN_WEEK = MOK_DAYS_IN_WEEK;

  public weeksInMonth: ICurrentWeek[] = [];

  constructor(
    @Self() private readonly ngOnDestroy$: NgOnDestroy,
    private dialog: MatDialog,
    private calendarService: CalendarService,
    private cdr: ChangeDetectorRef,
  ) {}

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

  public changeView(viewType: ECalendarViewType): void {
    this.viewType = viewType;
    this.generateCalendar();
  }

  public handleAddEditEvent(event: IEvent | null = null): void {
    const dialogConfig = new MatDialogConfig<IEvent>();
    dialogConfig.autoFocus = false;
    dialogConfig.data = event;

    this.dialog
      .open(AddEditEventModalComponent, dialogConfig)
      .afterClosed()
      .pipe(filter(Boolean), takeUntil(this.ngOnDestroy$))
      .subscribe((res: IEvent) => {
        this.calendarService.saveSlot(res);
        // this.slots.push(newSlot);
      });
  }

  public editSlot(slotId: number): void {
    // Логика редактирования слота
  }

  public deleteSlot(slotId: number): void {
    this.calendarService.deleteSlot(slotId);
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
