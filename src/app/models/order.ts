export interface Order {
  _id: string;
  products: Array<{id: number, qty: number}>;
  time: number;
  value: number;
}
