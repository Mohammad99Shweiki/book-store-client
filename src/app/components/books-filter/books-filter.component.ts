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
  sortMethods: Array<{ name: string, value: string }> = [
    {name: 'Default', value: 'default'},
    {name: 'Relevance', value: 'relevance'},
    {name: 'Price (desc)', value: 'price_desc'},
    {name: 'Price (asc)', value: 'price_asc'}
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
    this.timeout = setTimeout(() => {
      this.filterService.changeFilter(this.booksFilter);
    }, 1000);
  }

  filterBooks(): void {
    this.filterService.changeFilter(this.booksFilter);
  }
}
