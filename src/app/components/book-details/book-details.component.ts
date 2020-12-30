import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BooksService} from '../../services/books.service';
import {Book} from '../../models/book';
import {Review} from '../../models/review';
import {ReviewsService} from '../../services/reviews.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  book: Book;
  reviews: Review[];
  activeTab: 'description' | 'details' | 'reviews' = 'description';
  limit: 10;
  skip: 0;
  reviewsNumber: number;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private reviewsService: ReviewsService
  ) {
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getBook(this.id);
    this.getReviewsNumber(this.id);
  }

  getBook(id): void {
    this.booksService.getBook(id).subscribe((book: Book) => this.book = book);
  }

  getReviews(id, limit, skip): void {
    this.reviewsService.getReviewsByBookId(id, limit, skip).subscribe((reviews: Array<Review>) => this.reviews = reviews);
  }

  getReviewsNumber(id): void {
    this.reviewsService.getNumberOfReviewsByBookId(id).subscribe((reviewsNumber: number) => {
      this.reviewsNumber = reviewsNumber;
      if (reviewsNumber) {
        this.getReviews(this.id, this.limit, this.skip);
      }
    });
  }

  changeActiveTab(tabName: 'description' | 'details' | 'reviews'): void {
    this.activeTab = tabName;
  }
}
