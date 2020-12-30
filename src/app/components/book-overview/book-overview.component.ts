import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../../models/book';
import {faShoppingBasket, IconDefinition} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.css']
})
export class BookOverviewComponent implements OnInit {
  @Input() book: Book;
  constructor() { }
  faShoppingBasket: IconDefinition = faShoppingBasket;

  ngOnInit(): void {
  }

}
