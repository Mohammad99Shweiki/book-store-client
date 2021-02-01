import {Component, OnInit} from '@angular/core';
import {BooksService} from '../../services/books/books.service';
import {Book} from '../../models/book';
import {Title} from '@angular/platform-browser';

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
    this.getBestsellers();
    this.getNew();
    this.getSales();
    this.titleService.setTitle('BookStore');
  }

  getBestsellers(): void {
    this.booksService.getBestsellers().subscribe((books: Array<Book>) => {
      this.bestsellers = books;
      this.booksLoaded += books.length;
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
