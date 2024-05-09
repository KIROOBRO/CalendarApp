import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CalendarComponent } from './calendar.component';
import { AddEditEventModalModule } from './components/add-edit-event-modal/add-edit-event-modal.module';
import { ConfirmModalModule } from './components/confirm-modal/confirm-modal.module';

@NgModule({
  declarations: [CalendarComponent],
  exports: [CalendarComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    AddEditEventModalModule,
    ConfirmModalModule,
    MatSlideToggleModule,
    MatTooltipModule,
  ],
})
export class CalendarModule {}
