export interface Book {
  _id: string;
  author: string;
  title: string;
  description: string;
  genre: string;
  price: number;
  discountedPrice?: number;
  coverPhoto: string;
  pages: number;
  publication: string;
  publisher: string;
  ISBN: string;
  bestseller: boolean;
  new: boolean;
  id: number;
}
