import {Component, Input, OnInit} from '@angular/core';
import {faStar, IconDefinition} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() rating: number = 0;
  faStar: IconDefinition = faStar;

  constructor() {
  }

  ngOnInit(): void {
  }

  resolveRatingWidth(): object {
    return {
      width: this.rating * 20 + '%'
    };
  }
}
