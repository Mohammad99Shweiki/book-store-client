import {Component, Input, OnInit} from '@angular/core';
import {BooksFilter} from '../../models/booksFilter';
import {FilterService} from '../../services/filter/filter.service';

@Component({
  selector: 'app-books-filter',
  templateUrl: './books-filter.component.html',
  styleUrls: ['./books-filter.component.css']
})
export class BooksFilterComponent implements OnInit {
  genres: Array<string> = ['Humor', 'Romance', 'Action', 'Adventure', 'Classic', 'Graphic Novel', 'Fantasy', 'Crime', 'Historical Fiction', 'Horror', 'Literary Fiction', 'Sci-Fi', 'Short Stories',
    'Thriller', 'Biography', 'History', 'Poetry'];
  sortMethods: Array<{ name: string, value: string | {name: string, direction: 'asc' | 'desc'} }> = [
    {name: 'Default', value: 'default'},
    {name: 'Price (desc)', value: {name: 'minPrice', direction: 'desc'}},
    {name: 'Price (asc)', value: {name: 'minPrice', direction: 'asc'}},
    {name: 'Publication date (asc)', value: {name: 'publication', direction: 'asc'}},
    {name: 'Publication date (desc)', value: {name: 'publication', direction: 'desc'}}
  ];
  timeout: number = null;
  @Input() booksFilter: BooksFilter = {
    searchPhrase: null,
    dateFrom: null,
    dateTo: null,
    genres: [],
    sortBy: 'default',
    sale: false,
    bestseller: false,
    new: false
  };
  @Input() type: 'sale' | 'browse' | 'bestseller' | 'new';

  constructor(private filterService: FilterService) {
  }

  ngOnInit(): void {
  }

  changeDate(value: string, type: 'from' | 'to'): void {
    const dateArray: Array<number> = value.split('/').map((val: string) => Number(val)).reverse();
    const date: number = new Date(dateArray[0], dateArray[1], dateArray[2]).getTime();

    if (type === 'from' && !isNaN(date)) {
      this.booksFilter.dateFrom = date;
    } else if (type === 'to' && !isNaN(date)) {
      this.booksFilter.dateTo = date;
    }
  }

  searchTermChange(): void {
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
    //@ts-ignore
    this.timeout = setTimeout(() => {
      this.filterService.changeFilter(this.booksFilter);
    }, 1000);
  }

  filterBooks(): void {
    this.filterService.changeFilter(this.booksFilter);
  }
}
