import { DetailMapping } from '@/models/detailMapping';

export const detailsMapping: Array<DetailMapping> = [
  { key: 'author', label: 'Author', customPipe: false },
  { key: 'title', label: 'Title', customPipe: false },
  { key: 'genre', label: 'Genre', customPipe: true },
  { key: 'pages', label: 'Pages', customPipe: false },
  { key: 'publication', label: 'Publication date', customPipe: true },
  { key: 'publisher', label: 'Publisher', customPipe: false },
  { key: 'ISBN', label: 'ISBN', customPipe: false },
  { key: 'id', label: 'ID number', customPipe: false }
];
