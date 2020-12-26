import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../../models/book';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.css']
})
export class BookOverviewComponent implements OnInit {
  @Input() book: Book;
  constructor() { }

  ngOnInit(): void {
  }

}
