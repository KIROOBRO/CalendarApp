import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { ControlConverterModule } from '../../../../pipes/control-converter/control-converter.module';

import { AddEditEventModalComponent } from './add-edit-event-modal.component';

@NgModule({
  declarations: [AddEditEventModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    ControlConverterModule,
    MatCheckboxModule,
  ],
})
export class AddEditEventModalModule {}
