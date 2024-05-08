import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { CalendarComponent } from './calendar.component';
import { AddEditEventModalModule } from './components/add-edit-event-modal/add-edit-event-modal.module';

@NgModule({
  declarations: [CalendarComponent],
  exports: [CalendarComponent],
  imports: [CommonModule, MatButtonModule, AddEditEventModalModule],
})
export class CalendarModule {}
