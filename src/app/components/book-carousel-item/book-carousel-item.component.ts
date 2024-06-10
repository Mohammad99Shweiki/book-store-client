import { Component, Input, OnInit } from '@angular/core';
import { Book } from '@/models/book';
import { faShoppingBasket, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '@/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-carousel-item',
  templateUrl: './book-carousel-item.component.html',
  styleUrls: ['./book-carousel-item.component.css']
})
export class BookCarouselItemComponent implements OnInit {
  @Input() book: Book;

  faShoppingBasket: IconDefinition = faShoppingBasket;

  constructor(
    private cartService: CartService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  addToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: () => {
        this.toastr.success('Item added successfully');
      }
    });
  }
}
