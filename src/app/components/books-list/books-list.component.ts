import {Component, OnDestroy, OnInit} from '@angular/core';
import {BooksService} from '../../services/books.service';
import {Book} from '../../models/book';
import {Subscription} from 'rxjs';
import {NavService} from '../../services/nav.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  limit: number = 12;
  skip: number = 0;
  sidebarOpenedSubscription: Subscription;
  transformString: string;

  constructor(private booksService: BooksService, private navService: NavService) {
  }

  ngOnInit(): void {
    this.getLimitedBooks(this.limit, this.skip);
    this.setupSubscription();
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

  setupSubscription(): void {
    this.sidebarOpenedSubscription = this.navService.isSidebarOpened$.subscribe((status: boolean) => {
      this.transformString = status ? 'translateX(-300px)' : '';
    });
  }

  ngOnDestroy(): void {
    this.sidebarOpenedSubscription.unsubscribe();
  }

}
