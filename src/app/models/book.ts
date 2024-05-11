import { Rating } from "./rating";

export interface Book {
  isbn: string;
  title: string;
  authors: string[];
  genres: string[];
  price: number;
  description: string;
  publicationDate: string;
  ratings: Rating[];
  awards: string[];
  publisher: string;
  language: string;
  pages: number;
  available: number;
  sold: number;
  imageLink: string;
  fileLink: string
}
