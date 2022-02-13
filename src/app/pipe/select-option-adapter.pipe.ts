import { Pipe, PipeTransform } from '@angular/core';
import { SelectOption } from '../model/SelectConfig';

@Pipe({ name: 'selectOptionAdapter' })
export class SelectOptionAdapterPipe implements PipeTransform {
  transform(array: any[], optionAdapter: (item: any) => SelectOption): SelectOption[] {
    return array.map(item => optionAdapter(item));
  }
}
