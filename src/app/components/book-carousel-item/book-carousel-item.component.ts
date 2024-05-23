import { Component, Input, OnInit } from '@angular/core';
import { Book } from '@/models/book';
import { faShoppingBasket, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '@/services/cart/cart.service';

@Component({
  selector: 'app-book-carousel-item',
  templateUrl: './book-carousel-item.component.html',
  styleUrls: ['./book-carousel-item.component.css']
})
export class BookCarouselItemComponent implements OnInit {
  @Input() book: Book;

  faShoppingBasket: IconDefinition = faShoppingBasket;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  addToBasket(id: string): void {
    this.cartService.addProductToCart(id);
  }
}
