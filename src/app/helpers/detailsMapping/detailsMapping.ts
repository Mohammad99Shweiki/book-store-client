import {DetailMapping} from '../../models/detailMapping';

export const detailsMapping: Array<DetailMapping> = [
  {key: 'author', label: 'Autor', customPipe: false},
  {key: 'title', label: 'Tytuł', customPipe: false},
  {key: 'genre', label: 'Gatunek', customPipe: true},
  {key: 'publication', label: 'Data publikacji', customPipe: true},
  {key: 'ISBN', label: 'ISBN', customPipe: false},
  {key: 'bestseller', label: 'Bestseller', customPipe: true},
  {key: 'new', label: 'Nowość', customPipe: true},
  {key: 'id', label: 'Numer identyfikacyjny', customPipe: false}
];
