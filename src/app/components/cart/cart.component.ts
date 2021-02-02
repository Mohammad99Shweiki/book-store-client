import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart/cart.service';
import {Cart} from '../../models/cart';
import {UserService} from '../../services/user/user.service';
import {UserData} from '../../models/userData';
import {Book} from '../../models/book';
import {BooksService} from '../../services/books/books.service';
import {OrderService} from '../../services/order/order.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart;
  userData: UserData;
  loggedIn: boolean = true;
  books: Array<Book> = [];
  booksLoaded: boolean = false;
  cartValue: number = 0;
  onGoingRequest: boolean = false;

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private booksService: BooksService,
    private orderService: OrderService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.checkIfLoggedIn();
    this.getBooksInfo();
  }

  checkIfLoggedIn(): void {
    this.userService.getUserData().subscribe((val: UserData) => {
      if (val.createdAt) {
        this.loggedIn = true;
      }
    });
  }

  getBooksInfo(): void {
    const booksIds: Set<number> = new Set();
    this.cart.products.forEach((product: { id: number, qty: number }) => {
      booksIds.add(product.id);
    });
    if (booksIds.size) {
      this.booksService.getBooksByIds(Array.from(booksIds)).subscribe((books: Array<Book>) => {
        this.books = books;
        this.booksLoaded = true;
        this.setCartValue();
      });
    } else {
      this.booksLoaded = true;
    }
  }

  getBookById(id): Book {
    return this.books.find((val: Book) => val.id === id);
  }

  setCartValue(): void {
    this.cartValue = this.cart.products.reduce((acc: number, product: { id: number, qty: number }) => {
      return acc + (this.getBookById(product.id).discountedPrice ?? this.getBookById(product.id).price) * product.qty * 100;
    }, 0) / 100;
  }

  editProductInCart(productUpdate: { id: number, qty: number, type: 'update' | 'delete' }): void {
    if (productUpdate.type === 'update') {
      this.cartService.modifyProductInCart(productUpdate.id, productUpdate.qty);
      this.cart = this.cartService.getCart();
    } else if (productUpdate.type === 'delete') {
      this.cartService.removeProductFromCart(productUpdate.id);
    }
    this.setCartValue();
  }

  placeOrder(): void {
    this.onGoingRequest = true;
    this.orderService.placeOrder(this.cart, this.cartValue).subscribe((response: boolean) => {
      this.onGoingRequest = false;
      if (response) {
        this.toastr.success('Your order was correctly placed, thank you!');
        this.cartService.removeCart();
        this.cart = this.cartService.getCart();
        this.setCartValue();
      } else {
        this.toastr.error('Error while processing your order, try again later');
      }
    });
  }
}
