import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { faShoppingBasket, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.css']
})
export class BookOverviewComponent implements OnInit {
  @Input() book: Book;
  faShoppingBasket: IconDefinition = faShoppingBasket;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  addToBasket(id: string): void {
    this.cartService.addProductToCart(id);
  }
}
