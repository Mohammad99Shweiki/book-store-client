import { Book } from '@/models/book';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailsDialogComponent } from '../book-details-dialog/book-details-dialog.component';
import { BooksService } from '@/services/books/books.service';
import { ConfirmationModalComponent } from '@/components/confirmation-modal/confirmation-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-books-section',
  templateUrl: './books-section.component.html',
  styleUrls: ['./books-section.component.css']
})
export class BooksSectionComponent implements OnInit {
  dataSource = [];
  actions: [];
  loading = true;
  columns: string[] = [
    "isbn",
    "title",
    "authors",
    // "genres",
    "price",
    // "description",
    "publicationDate",
    // "ratings",
    // "awards",
    "publisher",
    "language",
    // "pages",
    "available",
    "sold",
    // "imageLink",
    // "fileLink",
    // "salePrice",
    "onSale",
    "actions"
  ];
  displayedColumns = this.columns.filter(col => col != 'actions')
  books: Book[] = []
  // [
  //   {
  //     isbn: "9780262633185",
  //     title: "Twisty Little Passages: An Approach to Interactive Fiction",
  //     authors: [
  //       "Nick Montfort"
  //     ],
  //     genres: [
  //       "Nonfiction",
  //       " Games",
  //       " Writing",
  //       " Video Games",
  //       " Technology",
  //       " Gaming",
  //       " History",
  //       " Game Design",
  //       " Computer Science",
  //       " Computers"
  //     ],
  //     price: 17.0,
  //     description: "A critical approach to interactive fiction, as literature and game.Interactive fiction--the best-known form of which is the text game or text adventure--has not received as much critical attention as have such other forms of electronic literature as hypertext fiction and the conversational programs known as chatterbots. Twisty Little Passages (the title refers to a maze in Adventure, the first interactive fiction) is the first book-length consideration of this form, examining it from gaming and literary perspectives. Nick Montfort, an interactive fiction author himself, offers both aficionados and first-time users a way to approach interactive fiction that will lead to a more pleasurable and meaningful experience of it.Twisty Little Passages looks at interactive fiction beginning with its most important literary ancestor, the riddle. Montfort then discusses Adventure and its precursors (including the I Ching and Dungeons and Dragons), and follows this with an examination of mainframe text games developed in response, focusing on the most influential work of that era, Zork. He then considers the introduction of commercial interactive fiction for home computers, particularly that produced by Infocom. Commercial works inspired an independent reaction, and Montfort describes the emergence of independent creators and the development of an online interactive fiction community in the 1990s. Finally, he considers the influence of interactive fiction on other literary and gaming forms. With Twisty Little Passages, Nick Montfort places interactive fiction in its computational and literary contexts, opening up this still-developing form to new consideration.",
  //     publicationDate: "2005-02-11",
  //     ratings: [],
  //     awards: [
  //       ""
  //     ],
  //     publisher: "MIT Press",
  //     language: "English",
  //     pages: 286,
  //     available: 10,
  //     sold: 5,
  //     imageLink: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1386920819l/191437.jpg",
  //     fileLink: null,
  //     onSale: false,
  //     salePrice: null,
  //   },
  //   {
  //     isbn: "34346346",
  //     title: "to Interactive Fiction",
  //     authors: [
  //       "Nick Montfort"
  //     ],
  //     genres: [
  //       "Nonfiction",
  //       " Games",
  //       " Writing",
  //       " Video Games",
  //       " Technology",
  //       " Gaming",
  //       " History",
  //       " Game Design",
  //       " Computer Science",
  //       " Computers"
  //     ],
  //     price: 17.0,
  //     description: "A critical approach to interactive fiction, as literature and game.Interactive fiction--the best-known form of which is the text game or text adventure--has not received as much critical attention as have such other forms of electronic literature as hypertext fiction and the conversational programs known as chatterbots. Twisty Little Passages (the title refers to a maze in Adventure, the first interactive fiction) is the first book-length consideration of this form, examining it from gaming and literary perspectives. Nick Montfort, an interactive fiction author himself, offers both aficionados and first-time users a way to approach interactive fiction that will lead to a more pleasurable and meaningful experience of it.Twisty Little Passages looks at interactive fiction beginning with its most important literary ancestor, the riddle. Montfort then discusses Adventure and its precursors (including the I Ching and Dungeons and Dragons), and follows this with an examination of mainframe text games developed in response, focusing on the most influential work of that era, Zork. He then considers the introduction of commercial interactive fiction for home computers, particularly that produced by Infocom. Commercial works inspired an independent reaction, and Montfort describes the emergence of independent creators and the development of an online interactive fiction community in the 1990s. Finally, he considers the influence of interactive fiction on other literary and gaming forms. With Twisty Little Passages, Nick Montfort places interactive fiction in its computational and literary contexts, opening up this still-developing form to new consideration.",
  //     publicationDate: "2005-02-11",
  //     ratings: [],
  //     awards: [
  //       ""
  //     ],
  //     publisher: "MIT Press",
  //     language: "English",
  //     pages: 286,
  //     available: 10,
  //     sold: 5,
  //     imageLink: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1386920819l/191437.jpg",
  //     fileLink: null,
  //     onSale: false,
  //     salePrice: null,
  //   },
  // ]


  constructor(
    private dialog: MatDialog,
    private booksService: BooksService,
    private toaster: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks() {
    this.loading = true;
    this.booksService.getBooks().subscribe(res => {
      this.books = res;
      this.loading = false;
    });
  }

  deleteBook(book: Book) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '400px',
      data: { message: 'Are you sure you want to delete this book?' }
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

  viewDetails(book: Book) {
    const dialogRef = this.dialog.open(BookDetailsDialogComponent, {
      width: '800px',
      data: { book }
    });

    dialogRef.afterClosed().subscribe((res: Book) => {
      if (res) {
        this.booksService.updateBook(book.isbn, res);
      }
    })
  }
}
