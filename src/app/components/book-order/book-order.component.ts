import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '../../models/book';
import {FormControl, Validators} from '@angular/forms';
import {ReviewsService} from '../../services/reviews/reviews.service';
import {ToastrService} from 'ngx-toastr';
import {Review} from '../../models/review';

@Component({
  selector: 'app-book-order',
  templateUrl: './book-order.component.html',
  styleUrls: ['./book-order.component.css']
})
export class BookOrderComponent implements OnInit {
  @Input() review: boolean;
  @Input() book: Book;
  @Input() qty: number;
  @Output() addedReview: EventEmitter<Review> = new EventEmitter<Review>();

  onGoingRequest: boolean = false;
  reviewTextareaVisible: boolean = false;
  reviewTextControl: FormControl = new FormControl('', [Validators.required, Validators.minLength(50)]);
  reviewRating: number = 5;

  constructor(private reviewsService: ReviewsService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addReview(): void {
    this.onGoingRequest = true;
    const review: Review = {
      bookId: this.book.id,
      reviewText: this.reviewTextControl.value,
      rating: this.reviewRating,
      reviewDate: Date.now(),
      userId : JSON.parse(localStorage.getItem('userData')).userId
    };
    this.reviewsService.addReview(review).subscribe((response: boolean) => {
      this.onGoingRequest = false;
      if (response) {
        this.toastr.success('Review added');
        this.review = true;
        this.addedReview.emit(review);
        this.reviewTextareaVisible = false;
      } else {
        this.toastr.error('Unexpected error, try again later');
        this.reviewTextControl.reset('');
      }
    });
  }

}
