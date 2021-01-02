import {Pipe, PipeTransform} from '@angular/core';
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
        transformedString = value.split('/').join('.');
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
