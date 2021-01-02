import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BooksService} from '../../services/books.service';
import {Book} from '../../models/book';
import {Review} from '../../models/review';
import {ReviewsService} from '../../services/reviews.service';
import {detailsMapping} from '../../helpers/detailsMapping/detailsMapping';
import {DetailMapping} from '../../models/detailMapping';
import {Detail} from '../../models/detail';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  book: Book;
  reviews: Review[];
  activeTab: 'description' | 'details' | 'reviews' = 'description';
  limit: number = 10;
  skip: number = 0;
  reviewsNumber: number;
  id: number;
  details: Array<Detail>;
  recommendedBooks: Array<Book> = [];

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private reviewsService: ReviewsService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getBook(this.id);
    this.getNumberOfReviews(this.id);
    this.getRecommendedBooks(this.id);
  }

  getBook(id): void {
    this.booksService.getBook(id).subscribe((book: Book) => {
      this.book = book;
      this.details = this.mapDetails(book);
    });
  }

  getLimitedReviews(id, limit, skip): void {
    this.reviewsService.getLimitedReviews(id, limit, skip).subscribe((reviews: Array<Review>) => this.reviews = reviews);
  }

  getNumberOfReviews(id): void {
    this.reviewsService.getNumberOfReviews(id).subscribe((reviewsNumber: number) => {
      this.reviewsNumber = reviewsNumber;
      if (reviewsNumber) {
        this.getLimitedReviews(this.id, this.limit, this.skip);
      }
    });
  }

  changeActiveTab(tabName: 'description' | 'details' | 'reviews'): void {
    this.activeTab = tabName;
  }

  mapDetails(book): Array<Detail> {
    const detailsMapped: Array<Detail> = [];
    detailsMapping.forEach((val: DetailMapping) => {
      detailsMapped.push({key: val.key, label: val.label, value: book[val.key], customPipe: val.customPipe});
    });
    return detailsMapped;
  }

  getRecommendedBooks(bookId: number): void {
   this.booksService.getRecommendedBooks(bookId).subscribe((books: Array<Book>) => this.recommendedBooks = books);
  }
}
