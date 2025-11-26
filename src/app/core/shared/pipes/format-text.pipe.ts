import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatText',
})
export class FormatTextPipe implements PipeTransform {
    transform(value: string|undefined): string {
        if (value) {
          return value.toLowerCase().split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        }
        return '-';
      }
}
