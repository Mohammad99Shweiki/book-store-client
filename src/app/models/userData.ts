import { CartItem } from './cart-item';
import { Order } from './order';

export interface UserData {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  wishlist: string[],
  cart: CartItem[],
  orders: Order[],
  favoriteGenres: string[],
  accountNonExpired: boolean,
  accountNonLocked: boolean,
  credentialsNonExpired: boolean,
  enabled: boolean,
  authorities: [
    {
      authority: string
    }
  ]
}