import {Component, OnInit} from '@angular/core';
import {faCaretUp, faCaretDown, IconDefinition} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-books-filter',
  templateUrl: './books-filter.component.html',
  styleUrls: ['./books-filter.component.css']
})
export class BooksFilterComponent implements OnInit {
  genres: Array<string> = ['Humor', 'Romance', 'Action', 'Adventure', 'Classic', 'Graphic Novel', 'Fantasy', 'Crime', 'Historical Fiction', 'Horror', 'Literary Fiction', 'Sci-Fi', 'Short Stories',
    'Thriller', 'Biography', 'History', 'Poetry'];
  faCaretUp: IconDefinition = faCaretUp;
  faCaretDown: IconDefinition = faCaretDown;
  constructor() {
  }

  ngOnInit(): void {
  }

  test(event: Event): void {
    console.log(event);
  }
}
