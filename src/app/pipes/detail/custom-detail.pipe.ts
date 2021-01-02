import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'customDetail'
})
export class CustomDetailPipe implements PipeTransform {

  transform(value: string, type: string): string {
    let transformedString: string;
    switch (type) {
      case 'genre': {
        transformedString = value.split('|').join(', ');
        break;
      }
      case 'publication': {
        transformedString = value.split('/').join('.');
        break;
      }
    }
    return transformedString;
  }

}
