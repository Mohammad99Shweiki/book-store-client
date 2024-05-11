import { CartItem } from "./cart-item";

export interface Order {
  orderId: string;
  localDate: string;
  items: CartItem[];
  totalPrice: number;
  shippingAddress: string;
  status: string;
  address: string;
  phoneNo: string;
}
