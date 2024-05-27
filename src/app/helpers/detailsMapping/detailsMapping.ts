import { DetailMapping } from '@/models/detailMapping';

export const detailsMapping: Array<DetailMapping> = [
  { key: 'authors', label: 'Authors', customPipe: false },
  { key: 'title', label: 'Title', customPipe: false },
  { key: 'genres', label: 'Genres', customPipe: true },
  { key: 'pages', label: 'Pages', customPipe: false },
  { key: 'publicationDate', label: 'Publication date', customPipe: false },
  { key: 'publisher', label: 'Publisher', customPipe: false },
  { key: 'isbn', label: 'ISBN', customPipe: false },
];
