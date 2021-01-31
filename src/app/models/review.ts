export interface Review {
  _id?: string;
  bookId: number;
  reviewText: string;
  rating: number;
  reviewDate: number;
  userId?: string;
}
