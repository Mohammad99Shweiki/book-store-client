import {Component, OnInit} from '@angular/core';
import {BooksService} from '../../services/books/books.service';
import {Book} from '../../models/book';
import {Title} from '@angular/platform-browser';
import { BooksResponse } from 'src/app/models/books-response';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  bestsellers: Array<Book> = [];
  sales: Array<Book> = [];
  new: Array<Book> = [];
  booksLoaded: number = 0;

  constructor(private booksService: BooksService, private titleService: Title) {
  }

  ngOnInit(): void {
    this.getBooks();
    // this.getNew();
    // this.getSales();
    // this.titleService.setTitle('BookStore');
  }

  getBooks(): void {
    this.booksService.getBooks().subscribe((res: Book[]) => {
      this.bestsellers = res;
      // this.booksLoaded += res.size;
    });
  }

  getSales(): void {
    this.booksService.getSales().subscribe((books: Array<Book>) => {
      this.sales = books;
      this.booksLoaded += books.length;
    });
  }

  getNew(): void {
    this.booksService.getNew().subscribe((books: Array<Book>) => {
      this.new = books;
      this.booksLoaded += books.length;
    });
  }

}
