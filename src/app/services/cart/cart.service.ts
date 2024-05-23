import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '@/models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart = JSON.parse(localStorage.getItem('userCart')) || { products: [] };
  cartLengthSource: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {
    this.countCartProductsLength();
  }

  addProductToCart(bookId: string): void {
    const bookIndex: number = this.cart.products.findIndex((element: { id: string, qty: number }) => element.id === bookId);
    bookIndex !== -1 ? this.cart.products[bookIndex].qty++ : this.cart.products.push({ id: bookId, qty: 1 });
    this.countCartProductsLength();
    this.setCartToLocalStorage();
  }

  modifyProductInCart(bookId: string, qty: number): void {
    this.cart.products[this.cart.products.findIndex((element: { id: string, qty: number }) => element.id + '' === bookId)].qty = qty;
    this.countCartProductsLength();
    this.setCartToLocalStorage();
  }

  removeProductFromCart(bookId: string): void {
    this.cart.products.splice(this.cart.products.findIndex((element: { id: string, qty: number }) => element.id === bookId), 1);
    this.countCartProductsLength();
    this.setCartToLocalStorage();
  }

  getCart(): Cart {
    return this.cart;
  }

  countCartProductsLength(): void {
    this.cartLengthSource.next(this.cart.products.reduce((accumulator: number, next: { id: string, qty: number }) => {
      return accumulator + next.qty;
    }, 0));
  }

  setCartToLocalStorage(): void {
    localStorage.setItem('userCart', JSON.stringify(this.cart));
  }

  removeCart(): void {
    localStorage.removeItem('userCart');
    this.cart = { products: [] };
    this.setCartToLocalStorage();
    this.countCartProductsLength();
  }
}
