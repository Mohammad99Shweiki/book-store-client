import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Book} from '../../models/book';
import 'hammerjs';
import {NguCarousel, NguCarouselConfig} from '@ngu/carousel';
import {faChevronLeft, faChevronRight, IconDefinition} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-book-carousel',
  templateUrl: './book-carousel.component.html',
  styleUrls: ['./book-carousel.component.css']
})
export class BookCarouselComponent implements OnInit {
  @Input() recommendedBooks: Array<Book>;

  @ViewChild('bookCarousel') myCarousel: NguCarousel<any>;
  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 2, md: 3, lg: 4, all: 0 },
    load: 3,
    loop: true,
    touch: true,
    velocity: 0.1,
    speed: 500
  };

  faChevronLeft: IconDefinition = faChevronLeft;
  faChevronRight: IconDefinition = faChevronRight;

  constructor() { }

  ngOnInit(): void { }

}
