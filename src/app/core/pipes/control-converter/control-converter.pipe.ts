import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';

@Pipe({
  name: 'controlConverter',
})
export class ControlConverterPipe implements PipeTransform {
  transform(control: unknown): FormControl {
    return control as FormControl;
  }
}
