import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { IEvent } from '../../../../interfaces';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmModalComponent implements OnInit {
  public modalData: IEvent;

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: IEvent,
    private dialogRef: MatDialogRef<ConfirmModalComponent>,
  ) {}

  public ngOnInit(): void {
    this.dialogRef.addPanelClass('confirm-modal');
    this.modalData = this.data;
  }

  public closeModal(value = false): void {
    this.dialogRef.close(value);
  }
}
