import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BooksService} from '../../services/books.service';
import {Book} from '../../models/book';
import {Review} from '../../models/review';
import {ReviewsService} from '../../services/reviews.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private reviewsService: ReviewsService
  ) {
  }

  book: Book;
  reviews: Review[];

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getBook(id);
    this.getReviews(id);
  }

  getBook(id): void {
    this.booksService.getBook(id).subscribe((book) => this.book = book);
  }

  getReviews(id): void {
    this.reviewsService.getReviewsByBookId(id).subscribe((reviews) => this.reviews = reviews);
  }
}
