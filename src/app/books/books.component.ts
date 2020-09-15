import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  constructor(private bookService: BooksService) {}
  books: Book[] = [];
  limit = 10;
  skip = 0;
  getLimitedBooks(limit: number, skip: number): void {
    this.bookService
      .getLimitedBooks(limit, skip)
      .subscribe((books) => this.books.push(...books));
    this.skip += limit;
  }
  ngOnInit(): void {
    this.getLimitedBooks(this.limit, this.skip);
    console.log(this);
  }

  onScroll(): void {
    console.log('scrolled');
    this.getLimitedBooks(this.limit, this.skip);
  }
}
