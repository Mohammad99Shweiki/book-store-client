import {Order} from './order';
import {Review} from './review';

export interface UserData {
  createdAt: number;
  email: string;
  ordersSum: number;
  orders: Array<Order>;
  reviews: Array<Review>;
}
