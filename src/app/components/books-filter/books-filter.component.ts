import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-books-filter',
  templateUrl: './books-filter.component.html',
  styleUrls: ['./books-filter.component.css']
})
export class BooksFilterComponent implements OnInit {
  genres: Array<string> = ['Humor', 'Romance', 'Action', 'Adventure', 'Classic', 'Graphic Novel', 'Fantasy', 'Crime', 'Historical Fiction', 'Horror', 'Literary Fiction', 'Sci-Fi', 'Short Stories',
    'Thriller', 'Biography', 'History', 'Poetry'];
  sortMethods: Array<{name: string, value: string}> = [
    {name: 'Relevance', value: 'relevance'},
    {name: 'Price (desc)', value: 'price_desc'},
    {name: 'Price (asc)', value: 'price_asc'}
  ];
  constructor() {
  }

  ngOnInit(): void {
  }

  test(event: Event): void {
    console.log(event);
  }
}
