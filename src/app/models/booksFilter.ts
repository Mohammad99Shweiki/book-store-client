export interface BooksFilter {
  searchPhrase: string;
  dateFrom: number;
  dateTo: number;
  genres: Array<string>;
  sortBy: string;
  sale: boolean;
  bestseller: boolean;
  new: boolean;
}
