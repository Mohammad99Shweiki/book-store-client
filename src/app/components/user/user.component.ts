import { Component, OnInit } from '@angular/core';
import { UserService } from '@/services/user/user.service';
import { UserData } from '@/models/userData';
import { BooksService } from '@/services/books/books.service';
import { Order } from '@/models/order';
import { Book } from '@/models/book';
import { Router } from '@angular/router';
import { Review } from '@/models/review';
import { faPlusSquare, faMinusSquare, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

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
  userForm: FormGroup;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  userGenres: string[] = [];

  constructor(
    private userService: UserService,
    private booksService: BooksService,
    private router: Router,
    private titleService: Title,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      userId: [{ value: '', disabled: true }],
      username: [''],
      firstName: [''],
      lastName: [''],
      email: ['', Validators.email],
      password: [''],
      genres: [''],
      // genres1: ['']
    });
  }

  ngOnInit(): void {
    this.getUserData();
    this.titleService.setTitle('User page - BookStore');
  }

  getUserData(): void {
    this.userService.getUserData().subscribe((userData: UserData) => {
      this.userData = userData;
      this.userGenres = userData.favoriteGenres;
      this.userForm.patchValue({
        ...this.userData
      });
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
    // if (booksIds.size) {
    //   this.booksService.getBooksByIds(Array.from(booksIds)).subscribe((books: Array<Book>) => {
    //     this.booksData = books;
    //   });
    // }
  }

  getBookById(id: string): Book {
    return this.booksData.find((val: Book) => val.isbn === id);
  }

  isBookReviewed(id: string) {
    // return this.userData.reviews.filter((review: Review) => review.bookId === id).length > 0;
  }

  saveProfile() {
    this.userService.updateProfile(this.userData.userId, this.userForm.value).subscribe(res => {
      console.log(res)
    })
  }

  toggleOrderVisibility(i: number): void {
    this.orderVisibility[i] = !this.orderVisibility[i];
  }

  addReview($event: Review): void {
    // this.userData.reviews.push($event);
  }

  remove(genre: string): void {
    const index = this.userGenres.indexOf(genre);

    if (index >= 0) {
      this.userGenres.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.userGenres.push(value);
    }
    event.input.value = ''
  }
}
