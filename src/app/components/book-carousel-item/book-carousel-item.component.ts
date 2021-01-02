import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../../models/book';
import {faShoppingBasket, IconDefinition} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book-carousel-item',
  templateUrl: './book-carousel-item.component.html',
  styleUrls: ['./book-carousel-item.component.css']
})
export class BookCarouselItemComponent implements OnInit {
  @Input() book: Book;

  faShoppingBasket: IconDefinition = faShoppingBasket;

  constructor() { }

  ngOnInit(): void {
  }

}
