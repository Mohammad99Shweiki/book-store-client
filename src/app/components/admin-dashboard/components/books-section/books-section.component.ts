import { Book } from '@/models/book';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailsDialogComponent } from '../book-details-dialog/book-details-dialog.component';
import { BooksService } from '@/services/books/books.service';
import { ConfirmationModalComponent } from '@/components/confirmation-modal/confirmation-modal.component';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { Subject, merge, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { TABLE_ITEMS_PER_PAGE } from '@/app.constants';

@Component({
  selector: 'app-books-section',
  templateUrl: './books-section.component.html',
  styleUrls: ['./books-section.component.css']
})
export class BooksSectionComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = [];
  actions: [];
  loading = true;
  columns: string[] = [
    "isbn",
    "title",
    "authors",
    "price",
    "publicationDate",
    "publisher",
    "language",
    "available",
    "sold",
    "onSale",
    "actions"
  ];
  displayedColumns = this.columns.filter(col => col != 'actions')
  books: any;
  resultLength!: number;
  itemsPerPage = TABLE_ITEMS_PER_PAGE
  private searchSubject: Subject<string> = new Subject();

  constructor(
    private dialog: MatDialog,
    private booksService: BooksService,
    private toaster: ToastrService
  ) {

  }
  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.searchBooks(searchTerm);
    });
  }

  ngAfterViewInit() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loading = true;
          return this.booksService!.getBooks(
            this.paginator.pageIndex,
          ).pipe(catchError(() => of(null)));
        }),
        map(data => {
          this.loading = false;

          if (data === null) {
            return [];
          }

          this.resultLength = data.totalElements;
          return data;
        }),
      )
      .subscribe(data => (this.books = data.content));
  }

  searchBooks(search: string) {
    this.loading = true;
    this.booksService.searchBooks(search).subscribe(res => {
      this.books = res;
      this.loading = false;
    })
  }

  fetchBooks() {
    this.loading = true;
    this.booksService.getBooks().subscribe(res => {
      this.books = res.content;
      this.loading = false;
    });
  }

  applySearch(event: any) {
    const searchTerm = event.target.value;
    this.searchSubject.next(searchTerm);
  }

  deleteBook(book: Book) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '400px',
      data: { message: 'Are you sure you want to delete this book?', isDelete: true }
    })

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.booksService.deleteBook(book.isbn).subscribe({
          next: () => {
            this.fetchBooks();
            this.toaster.success('Book deleted successfully')
          },
          error: () => {
            this.toaster.error('Error occurred')
          }
        })
      }
    })
  }

  openBookDialog(book: Book | null, isEdit: boolean = true) {
    const dialogRef = this.dialog.open(BookDetailsDialogComponent, {
      width: '800px',
      data: { book }
    });

    dialogRef.afterClosed().subscribe((res: Book) => {
      if (res) {
        if (isEdit) {
          this.booksService.updateBook(book.isbn, res).subscribe(res => {
            this.fetchBooks();
          });
        } else {
          this.booksService.addBook(res).subscribe(res => {
            this.fetchBooks();
          });
        }
      }
    })
  }
}
