import { Pipe, PipeTransform } from '@angular/core';

/**
 * HufPipe formats a numeric value as Hungarian Forint (HUF) currency.
 * It rounds the number to one decimal place (because the provided prices would be too low for HUF), formats it with Hungarian locale rules,
 * and appends the "Ft" suffix.
 *
 * Usage in template:
 *   {{ product.price | huf }}
 *   Output example: "2 990 Ft"
 */
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
