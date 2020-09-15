import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private bookService: BooksService
  ) {}
  book: Book;
  ngOnInit(): void {
    this.getHero();
    console.log(this);
  }
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.bookService.getBook(id).subscribe((book) => (this.book = book));
  }
}
