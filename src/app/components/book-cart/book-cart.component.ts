import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '../../models/book';
import {faPlusSquare, faMinusSquare, IconDefinition} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book-cart',
  templateUrl: './book-cart.component.html',
  styleUrls: ['./book-cart.component.css']
})
export class BookCartComponent implements OnInit {
  @Input() book: Book;
  @Input() qty: number;
  @Output() productEdited: EventEmitter<{ id: number, qty: number, type: 'update' | 'delete' }> =
    new EventEmitter<{ id: number; qty: number; type: 'update' | 'delete' }>();
  faPlusSquare: IconDefinition = faPlusSquare;
  faMinusSquare: IconDefinition = faMinusSquare;

  constructor() {
  }

  ngOnInit(): void {
  }

  removeBook(): void {
    console.log('usuwam książkę x1');
    this.productEdited.emit({id: this.book.id, qty: this.qty, type: 'delete'});
  }

  changeQty(value): void {
    this.qty += value;
    this.productEdited.emit({id: this.book.id, qty: this.qty, type: 'update'});
  }
}
