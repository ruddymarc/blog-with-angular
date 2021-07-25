import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nl2br'
})
export class NewLineToBreakPipe implements PipeTransform {

  transform(value: string|null): string | null {
    return value ? value.replace(/\n/gi, '<br>') : null;
  }

}
