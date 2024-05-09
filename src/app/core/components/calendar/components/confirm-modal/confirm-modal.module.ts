import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { ConfirmModalComponent } from './confirm-modal.component';

@NgModule({
  declarations: [ConfirmModalComponent],
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule],
})
export class ConfirmModalModule {}
