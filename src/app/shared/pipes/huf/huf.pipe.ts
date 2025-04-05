import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'huf',
})
export class HufPipe implements PipeTransform {
  transform(value: number | string): string {
    if (!value || isNaN(Number(value))) {
      return '';
    }

    const amount = Math.round(Number(value) * 10).toLocaleString('hu-HU');
    return amount + ' Ft';
  }
}
