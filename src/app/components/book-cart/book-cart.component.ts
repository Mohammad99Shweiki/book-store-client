import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '@/models/book';
import { faPlusSquare, faMinusSquare, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CartItem } from '@/models/cart-item';

@Component({
  selector: 'app-book-cart',
  templateUrl: './book-cart.component.html',
  styleUrls: ['./book-cart.component.css']
})
export class BookCartComponent implements OnInit {
  @Input() book: any
  @Input() qty: number;
  @Output() productEdited: EventEmitter<{ id: string, qty: number, type: 'update' | 'delete' }> =
    new EventEmitter<{ id: string; qty: number; type: 'update' | 'delete' }>();
  faPlusSquare: IconDefinition = faPlusSquare;
  faMinusSquare: IconDefinition = faMinusSquare;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.book)
  }

  removeBook(): void {
    // this.productEdited.emit({ id: this.book.isbn, qty: this.qty, type: 'delete' });
  }

  changeQty(value): void {
    this.qty += value;
    // this.productEdited.emit({ id: this.book.isbn, qty: this.qty, type: 'update' });
  }
}
