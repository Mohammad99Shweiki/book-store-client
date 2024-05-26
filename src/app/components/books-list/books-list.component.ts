import { Component, OnDestroy, OnInit } from '@angular/core';
import { BooksService } from '@/services/books/books.service';
import { Book } from '@/models/book';
import { Subscription } from 'rxjs';
import { BooksFilter } from '@/models/booksFilter';
import { FilterService } from '@/services/filter/filter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

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
  loading = false;
  timeout: number = null;

  constructor(
    private booksService: BooksService,
    private filterService: FilterService,
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
    private toast: ToastrService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.type = this.route.snapshot.data.type;
  }

  ngOnInit(): void {
    this.setupSubscription();
    this.getBooks();
    this.setupTitle();
  }

  setupTitle(): void {
    this.title += this.type.charAt(0).toUpperCase() + this.type.slice(1);
    this.title += this.type === 'browse' || this.type === 'new' || this.type === 'main' ? ' - BookStore' : 's - BookStore';
    this.titleService.setTitle(this.title);
  }

  onAdvanceSearch(event: any) {

    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
    //@ts-ignore
    this.timeout = setTimeout(() => {
      this.onSearch(event.target.value)
    }, 1000);
  }

  onSearch(searchTerm: string) {
    if (searchTerm === '') {
      this.getBooks();
      return;
    }
    this.loading = true;
    this.booksService.searchBooks(searchTerm).subscribe({
      next: (res) => {
        this.books = res;
        this.loading = false;
      },
      error: () => {
        this.toast.error('Something went wrong');
      }
    });
  }

  onScroll(): void {
  }

  getBooks(): void {
    this.noBooks = false;
    this.loading = true;
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
    this.loading = false;
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
