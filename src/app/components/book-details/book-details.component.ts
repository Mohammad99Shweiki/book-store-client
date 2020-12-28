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

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private reviewsService: ReviewsService
  ) {
  }

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.getBook(id);
    this.getReviews(id);
  }

  getBook(id): void {
    this.booksService.getBook(id).subscribe((book: Book) => this.book = book);
  }

  getReviews(id): void {
    this.reviewsService.getReviewsByBookId(id).subscribe((reviews: Array<Review>) => this.reviews = reviews);
  }

  changeActiveTab(tabName: 'description' | 'details' | 'reviews'): void {
    this.activeTab = tabName;
  }
}
