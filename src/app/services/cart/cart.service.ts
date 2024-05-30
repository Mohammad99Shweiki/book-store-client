import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '@/models/cart';
import { HttpClient } from '@angular/common/http';
import { END_POINTS } from '@/app.constants';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart = JSON.parse(localStorage.getItem('userCart')) || { products: [] };
  cartLengthSource: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private httpClient: HttpClient) {
    this.countCartProductsLength();
  }

  getUserCart() {
    const { id } = JSON.parse(localStorage.getItem('userData'));
    return this.httpClient.get([END_POINTS.CART, id].join('/'));
  }

  addProductToCart(bookId: string): void {
    const bookIndex: number = this.cart.items.findIndex((element: { id: string, qty: number }) => element.id === bookId);
    bookIndex !== -1 ? this.cart.items[bookIndex].qty++ : this.cart.items.push({ id: bookId, qty: 1 });
    this.countCartProductsLength();
    this.setCartToLocalStorage();
  }

  modifyProductInCart(bookId: string, qty: number): void {
    this.cart.items[this.cart.items.findIndex((element: { id: string, qty: number }) => element.id + '' === bookId)].qty = qty;
    this.countCartProductsLength();
    this.setCartToLocalStorage();
  }

  removeProductFromCart(bookId: string): void {
    this.cart.items.splice(this.cart.items.findIndex((element: { id: string, qty: number }) => element.id === bookId), 1);
    this.countCartProductsLength();
    this.setCartToLocalStorage();
  }

  getCart(): Cart {
    return this.cart;
  }

  countCartProductsLength(): void {
    // this.cartLengthSource.next(this.cart.items.reduce((accumulator: number, next: { id: string, qty: number }) => {
    //   return accumulator + next.qty;
    // }, 0));
  }

  setCartToLocalStorage(): void {
    localStorage.setItem('userCart', JSON.stringify(this.cart));
  }

  removeCart(): void {
    localStorage.removeItem('userCart');
    this.cart = { items: [], totalPrice: 0 };
    this.setCartToLocalStorage();
    this.countCartProductsLength();
  }
}
