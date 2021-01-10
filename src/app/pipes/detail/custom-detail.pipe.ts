import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'customDetail'
})
export class CustomDetailPipe implements PipeTransform {

  transform(value: string | Array<string>, type: string): string {
    let transformedString: string;
    switch (type) {
      case 'genre': {
        transformedString = Array.from(value).join(', ');
        break;
      }
      case 'publication': {
        const date: Date = new Date(Number(value));
        transformedString = date.toLocaleDateString('en-GB');
        break;
      }
    }
    return transformedString;
  }

}
