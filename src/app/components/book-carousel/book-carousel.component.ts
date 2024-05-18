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
  @Input() books: Array<Book>;
  @Input() size: 'sm' | 'lg' = 'sm';

  @ViewChild('bookCarousel') myCarousel: NguCarousel<any>;
  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 2, md: 3, lg: 3, all: 0 },
    gridBreakpoints: {sm: 660, md: 920, lg: 1200, xl: 1200},
    load: 3,
    loop: true,
    touch: true,
    velocity: 0.1,
    speed: 500,
    point: {
      visible: true,
      hideOnSingleSlide: true
    }
  };

  faChevronLeft: IconDefinition = faChevronLeft;
  faChevronRight: IconDefinition = faChevronRight;

  constructor() { }

  ngOnInit(): void {
    this.setSize();
  }

  setSize(): void {
    this.carouselConfig.grid = this.size === 'sm' ? { xs: 1, sm: 2, md: 3, lg: 3, all: 0 } : { xs: 1, sm: 2, md: 3, lg: 4, all: 0 };
  }
}
