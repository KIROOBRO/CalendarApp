import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';

import { EControlNames } from '../../../../enums/e-control-names';
import { IEvent } from '../../../../interfaces/i-event';
import { NgOnDestroy } from '../../../../services/ng-on-destroy.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'LL',
    monthLabel: 'MMMM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'LL',
  },
};

@Component({
  selector: 'app-add-edit-event-modal',
  templateUrl: './add-edit-event-modal.component.html',
  styleUrls: ['./add-edit-event-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    NgOnDestroy,
  ],
})
export class AddEditEventModalComponent implements OnInit {
  public formGroup: FormGroup;
  public EControlNames = EControlNames;

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: IEvent,
    private dialogRef: MatDialogRef<AddEditEventModalComponent>,
    private fb: FormBuilder,
  ) {}

  public get getHeaderName(): string {
    return this.data ? 'Edit specialty name' : 'Add specialty';
  }

  ngOnInit(): void {
    this.dialogRef.addPanelClass('add-edit-event-modal');
    this.initFormGroup(this.data);
  }

  public closeModal(): void {
    this.dialogRef.close();
  }

  public handleSubmit(): void {
    this.dialogRef.close(this.formGroup.getRawValue());
  }

  public clearName(): void {
    this.formGroup.get(EControlNames.NAME)?.reset(null);
  }

  private initFormGroup(event: IEvent): void {
    this.formGroup = this.fb.group({
      [EControlNames.NAME]: [event?.name || null, [Validators.required]],
      [EControlNames.START_DATE]: [
        event?.start_date || null,
        [Validators.required],
      ],
      [EControlNames.END_DATE]: [
        event?.end_date || null,
        [Validators.required],
      ],
      [EControlNames.IS_HOLIDAY]: [event?.is_holiday || null],
    });
  }
}
