export interface Review {
  _id?: string;
  bookId: string;
  reviewText: string;
  rating: number;
  reviewDate: number;
  userId?: string;
}
