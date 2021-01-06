import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../../../models/book';

@Component({
  selector: 'app-book-labels',
  templateUrl: './book-labels.component.html',
  styleUrls: ['./book-labels.component.css']
})
export class BookLabelsComponent implements OnInit {
  @Input() book: Book;
  @Input() size?: 'sm' | 'lg' = 'sm';
  sizeStyles: { fontSize: string, padding: string };

  constructor() {
  }

  ngOnInit(): void {
    this.setSizeStyles();
  }

  setSizeStyles(): void {
    this.sizeStyles = {
      fontSize: this.size === 'sm' ? '0.875rem' : '0.9375rem',
      padding: this.size === 'sm' ? '3px 12px' : '4px 16px'
    };
  }

}
