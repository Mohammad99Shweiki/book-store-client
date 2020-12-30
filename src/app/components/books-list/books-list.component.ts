import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent implements OnInit {
  constructor(private booksService: BooksService) {}
  books: Book[] = [];
  limit: number = 12;
  skip: number = 0;

  ngOnInit(): void {
    this.getLimitedBooks(this.limit, this.skip);
  }

  getLimitedBooks(limit: number, skip: number): void {
    this.booksService
      .getLimitedBooks(limit, skip)
      .subscribe((books: Array<Book>) => this.books.push(...books));
    this.skip += limit;
  }

  onScroll(): void {
    this.getLimitedBooks(this.limit, this.skip);
  }
}
