import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {UserData} from '../../models/userData';
import {BooksService} from '../../services/books/books.service';
import {Order} from '../../models/order';
import {Book} from '../../models/book';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userData: UserData;
  booksData: Array<Book>;

  constructor(private userService: UserService, private booksService: BooksService) {
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    this.userService.getUserData().subscribe((userData: UserData) => {
      this.userData = userData;
      this.getBooksData();
    });
  }

  getBooksData(): void {
    const booksIds: Set<number> = new Set();
    this.userData.orders.forEach((order: Order) => {
      order.products.forEach((product: { id: number, qty: number }) => {
        booksIds.add(product.id);
      });
    });
    this.booksService.getBooksByIds(Array.from(booksIds)).subscribe((books: Array<Book>) => {
      this.booksData = books;
    });
  }
}
