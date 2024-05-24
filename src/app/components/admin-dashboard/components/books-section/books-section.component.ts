import { Book } from '@/models/book';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailsDialogComponent } from '../book-details-dialog/book-details-dialog.component';
import { BooksService } from '@/services/books/books.service';
import { ConfirmationModalComponent } from '@/components/confirmation-modal/confirmation-modal.component';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { merge, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-books-section',
  templateUrl: './books-section.component.html',
  styleUrls: ['./books-section.component.css']
})
export class BooksSectionComponent implements AfterViewInit {
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
  resultLength!: number
  constructor(
    private dialog: MatDialog,
    private booksService: BooksService,
    private toaster: ToastrService
  ) {

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


  fetchBooks() {
    this.loading = true;
    this.booksService.getBooks().subscribe(res => {
      this.books = res.content;
      this.loading = false;
    });
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
