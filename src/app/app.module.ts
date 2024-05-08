import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as moment from 'moment/moment';

import { AppComponent } from './app.component';
import { CalendarModule } from './core/components/calendar/calendar.module';

moment.updateLocale('en', {
  week: {
    dow: 1,
    doy: 0,
  },
});

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, CalendarModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
