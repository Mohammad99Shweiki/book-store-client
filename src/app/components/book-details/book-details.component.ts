import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '@/services/books/books.service';
import { Book } from '@/models/book';
import { Review } from '@/models/review';
import { ReviewsService } from '@/services/reviews/reviews.service';
import { detailsMapping } from '@/helpers/detailsMapping/detailsMapping';
import { DetailMapping } from '@/models/detailMapping';
import { Detail } from '@/models/detail';
import { Title } from '@angular/platform-browser';
import { CartService } from '@/services/cart/cart.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  book: Book;
  reviews: Array<Review> = [];
  activeTab: 'description' | 'details' | 'reviews' = 'description';
  limit: number = 5;
  skip: number = 0;
  reviewsNumber: number;
  id: number;
  details: Array<Detail>;
  similarBooks: Array<Book> = [];
  title: string = ' - BookStore';

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private reviewsService: ReviewsService,
    private router: Router,
    private titleService: Title,
    private cartService: CartService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getBook();
    // this.getNumberOfReviews();
    this.getSimilarBooks();
  }

  getBook(): void {
    this.booksService.getBook(this.id).subscribe((book: Book) => {
      this.book = book;
      this.details = this.mapDetails(book);
      this.titleService.setTitle(book.title + this.title);
    });
  }

  getLimitedReviews(id, limit, skip): void {
    this.reviewsService.getLimitedReviews(id, limit, skip).subscribe((reviews: Array<Review>) => this.reviews.push(...reviews));
  }

  getNumberOfReviews(): void {
    this.reviewsService.getNumberOfReviews(this.id).subscribe((reviewsNumber: number) => {
      this.reviewsNumber = reviewsNumber;
      if (reviewsNumber) {
        this.getLimitedReviews(this.id, this.limit, this.skip);
      }
    });
  }

  getMoreReviews(): void {
    this.skip += this.limit;
    this.getLimitedReviews(this.id, this.limit, this.skip);
  }

  changeActiveTab(tabName: 'description' | 'details' | 'reviews'): void {
    this.activeTab = tabName;
  }

  mapDetails(book): Array<Detail> {
    const detailsMapped: Array<Detail> = [];
    detailsMapping.forEach((val: DetailMapping) => {
      detailsMapped.push({ key: val.key, label: val.label, value: book[val.key], customPipe: val.customPipe });
    });
    return detailsMapped;
  }

  getSimilarBooks(): void {
    this.booksService.getSimilarBooks(this.id).subscribe((books: Array<Book>) => this.similarBooks = books);
  }

  addToBasket(id: string, redirect?: boolean): void {
    this.cartService.addProductToCart(id);
    if (redirect) {
      this.router.navigate(['/cart']);
    }
  }
}
