import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IconDefinition, faStar} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rating-selector',
  templateUrl: './rating-selector.component.html',
  styleUrls: ['./rating-selector.component.css']
})
export class RatingSelectorComponent implements OnInit {
  @Input() rating: number = 0;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();

  faStar: IconDefinition = faStar;

  constructor() {
  }

  ngOnInit(): void {
  }

  setRating(rating: number): void {
    this.rating = rating;
    this.ratingChange.emit(rating);
  }

}
