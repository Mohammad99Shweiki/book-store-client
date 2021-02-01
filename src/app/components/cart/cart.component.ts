import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart/cart.service';
import {Cart} from '../../models/cart';
import {UserService} from '../../services/user/user.service';
import {UserData} from '../../models/userData';
import {Book} from '../../models/book';
import {BooksService} from '../../services/books/books.service';

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

  constructor(private cartService: CartService, private userService: UserService, private booksService: BooksService) {
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
      });
    } else {
      this.booksLoaded = true;
    }
  }

  getBookById(id): Book {
    return this.books.find((val: Book) => val.id === id);
  }

  editProductInCart(productUpdate: { id: number, qty: number, type: 'update' | 'delete' }): void {
    if (productUpdate.type === 'update') {
      this.cart.products[this.cart.products.findIndex((cartProduct: {id: number, qty: number}) => cartProduct.id === productUpdate.id)] = {
        id: productUpdate.id,
        qty: productUpdate.qty
      };
      this.cartService.modifyProductInCart(productUpdate.id, productUpdate.qty);
    } else if (productUpdate.type === 'delete') {
      this.cartService.removeProductFromCart(productUpdate.id);
    }
  }

  placeOrder(): void {
   return;
  }
}
