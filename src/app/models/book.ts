export interface Book {
  _id: string;
  author: string;
  title: string;
  genre: string;
  price: number;
  discountedPrice?: number;
  coverPhoto: string;
  publication: string;
  ISBN: string;
  bestseller: boolean;
  new: boolean;
  id: number;
}
