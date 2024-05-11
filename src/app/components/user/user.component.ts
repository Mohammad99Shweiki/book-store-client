import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {UserData} from '../../models/userData';
import {BooksService} from '../../services/books/books.service';
import {Order} from '../../models/order';
import {Book} from '../../models/book';
import {Router} from '@angular/router';
import {Review} from '../../models/review';
import {faPlusSquare, faMinusSquare, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {Title} from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userData: UserData;
  booksData: Array<Book> = [];
  faPlusSquare: IconDefinition = faPlusSquare;
  faMinusSquare: IconDefinition = faMinusSquare;
  orderVisibility: Array<boolean> = [];

  constructor(
    private userService: UserService, 
    private booksService: BooksService, 
    private router: Router, private titleService: Title,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getUserData();
    this.titleService.setTitle('User page - BookStore');
  }

  getUserData(): void {
    this.userService.getUserData().subscribe((userData: UserData) => {
      this.userData = userData;
      // userData.orders.forEach((val: Order, index: number) => {
      //   this.orderVisibility[index] = false;
      // });
      this.getBooksData();
    });
  }

  getBooksData(): void {
    const booksIds: Set<string> = new Set();
    this.userData?.orders?.forEach((order: Order) => {
      order.items.forEach((product) => {
        booksIds.add(product.bookId);
      });
    });
    if (booksIds.size) {
      this.booksService.getBooksByIds(Array.from(booksIds)).subscribe((books: Array<Book>) => {
        this.booksData = books;
      });
    }
  }

  getBookById(id): Book {
    return this.booksData.find((val: Book) => val.isbn === id);
  }

  isBookReviewed(id) {
    // return this.userData.reviews.filter((review: Review) => review.bookId === id).length > 0;
  }

  logout(): void {
    localStorage.removeItem('userData');
    this.router.navigate(['/']);
    this.authService.loggedInChange.next(false)
  }

  toggleOrderVisibility(i: number): void {
    this.orderVisibility[i] = !this.orderVisibility[i];
  }

  addReview($event: Review): void {
    // this.userData.reviews.push($event);
  }
}
