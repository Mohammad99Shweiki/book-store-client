import {Component, OnDestroy, OnInit} from '@angular/core';
import {BooksService} from '../../services/books/books.service';
import {Book} from '../../models/book';
import {Subscription} from 'rxjs';
import {NavService} from '../../services/nav/nav.service';
import {BooksFilter} from '../../models/booksFilter';
import {FilterService} from '../../services/filter/filter.service';

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
  sidebarTransformString: string;
  filtersOpened: boolean;
  booksFilter: BooksFilter = {
    searchPhrase: null,
    dateFrom: null,
    dateTo: null,
    genres: [],
    sortBy: 'default',
    sale: false,
    bestseller: false,
    new: false
  };
  booksFilterSubscription: Subscription;
  constructor(private booksService: BooksService, private navService: NavService, private filterService: FilterService) {
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
      if (status && this.filtersOpened) {
        this.toggleFilters();
      }
      this.sidebarTransformString = status ? 'translateX(-300px)' : '';
    });
    this.booksFilterSubscription = this.filterService.filter$.subscribe((filter: BooksFilter) => {
      this.booksFilter = filter;
    });
  }

  toggleFilters(): void {
    this.filtersOpened = !this.filtersOpened;
  }

  ngOnDestroy(): void {
    this.sidebarOpenedSubscription.unsubscribe();
  }

}
