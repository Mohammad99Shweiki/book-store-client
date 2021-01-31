import {Order} from './order';
import {Review} from './review';

export interface UserData {
  registeredAt: number;
  email: string;
  ordersSum: number;
  orders: Array<Order>;
  reviews: Array<Review>;
}
