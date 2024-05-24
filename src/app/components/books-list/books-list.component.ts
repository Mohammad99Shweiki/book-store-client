import { Component, OnDestroy, OnInit } from '@angular/core';
import { BooksService } from '@/services/books/books.service';
import { Book } from '@/models/book';
import { Subscription } from 'rxjs';
import { BooksFilter } from '@/models/booksFilter';
import { FilterService } from '@/services/filter/filter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  limit: number = 12;
  skip: number = 0;
  filtersOpened: boolean;
  noBooks: boolean = false;
  booksFilterSubscription: Subscription;
  type: 'sale' | 'browse' | 'bestseller' | 'new' | 'main';
  title: string = '';

  constructor(
    private booksService: BooksService,
    private filterService: FilterService,
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.type = this.route.snapshot.data.type;
  }

  ngOnInit(): void {
    this.setupSubscription();
    this.setupType();
    this.setupTitle();
  }

  setupType(): void {
    this.getBooks();
  }

  setupTitle(): void {
    this.title += this.type.charAt(0).toUpperCase() + this.type.slice(1);
    this.title += this.type === 'browse' || this.type === 'new' || this.type === 'main' ? ' - BookStore' : 's - BookStore';
    this.titleService.setTitle(this.title);
  }

  onScroll(): void {
  }

  getBooks(): void {
    this.noBooks = false;
    if (this.type == 'sale') {
      this.booksService.getBooksSales().subscribe((res: Book[]) => {
        this.books.push(...res);
        this.noBooks = !this.books.length;
      });
    } else if (this.type == 'main') {
      this.booksService.getBooks().subscribe((res) => {
        this.books.push(...res.content);
        this.noBooks = !this.books.length;
      })
    }
    // this.skip += limit;
  }

  setupSubscription(): void {
    this.booksFilterSubscription = this.filterService.filter$.subscribe((filter: BooksFilter) => {
      this.books = [];
      // this.booksFilter = filter;
      this.skip = 0;
      this.getBooks();
    });
  }

  toggleFilters(): void {
    this.filtersOpened = !this.filtersOpened;
  }

  ngOnDestroy(): void {
    this.booksFilterSubscription.unsubscribe();
  }

}
