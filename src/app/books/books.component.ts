import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  constructor(private booksService: BooksService) {}
  books: Book[] = [];
  limit = 12;
  skip = 0;
  getLimitedBooks(limit: number, skip: number): void {
    this.booksService
      .getBooksWithLimitAndSkip(limit, skip)
      .subscribe((books) => this.books.push(...books));
    this.skip += limit;
  }
  ngOnInit(): void {
    this.getLimitedBooks(this.limit, this.skip);
  }

  onScroll(): void {
    this.getLimitedBooks(this.limit, this.skip);
  }
}
