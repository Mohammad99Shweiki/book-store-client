import { ORDER_STATUS } from "@/app.constants";
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

export interface ReportOrder {
  date: string;
  totalPrice: number;
  status: keyof typeof ORDER_STATUS;
  address: string;
}