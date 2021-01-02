import {Pipe, PipeTransform} from '@angular/core';
import {formatDate} from '@angular/common';
import {genreTranslations} from '../../helpers/genreTranslations/genreTranslations';

@Pipe({
  name: 'customDetail'
})
export class CustomDetailPipe implements PipeTransform {

  transform(value: string, type: string): string {
    let transformedString: string;
    switch (type) {
      case 'genre': {
        transformedString = value.split('|').map((val: string) => {
          return genreTranslations[val];
        }).join(', ');
        break;
      }
      case 'publication': {
        transformedString = formatDate(value, 'dd.MM.YYYY', 'en-US');
        break;
      }
      case 'bestseller':
      case 'new': {
        transformedString = value === 'true' ? 'Tak' : 'Nie';
        break;
      }
    }
    return transformedString;
  }

}
