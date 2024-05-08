import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ControlConverterPipe } from './control-converter.pipe';

@NgModule({
  declarations: [ControlConverterPipe],
  imports: [CommonModule],
  exports: [ControlConverterPipe],
})
export class ControlConverterModule {}
