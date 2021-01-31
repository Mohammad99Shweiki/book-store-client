export interface Order {
  products: Array<{id: number, qty: number}>;
  time: number;
  value: number;
}
