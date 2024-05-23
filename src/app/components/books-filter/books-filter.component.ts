import { Component, Input, OnInit } from '@angular/core';
import { BooksFilter } from '@/models/booksFilter';
import { FilterService } from '@/services/filter/filter.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BooksService } from 'src/app/services/books/books.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-books-filter',
  templateUrl: './books-filter.component.html',
  styleUrls: ['./books-filter.component.css']
})
export class BooksFilterComponent implements OnInit {
  genres: Array<string> = ['Humor', 'Romance', 'Action', 'Adventure', 'Classic', 'Graphic Novel', 'Fantasy', 'Crime', 'Historical Fiction', 'Horror', 'Literary Fiction', 'Sci-Fi', 'Short Stories',
    'Thriller', 'Biography', 'History', 'Poetry'];
  sortMethods: Array<{ name: string, value: string | { name: string, direction: 'asc' | 'desc' } }> = [
    { name: 'Default', value: 'default' },
    { name: 'Price (desc)', value: { name: 'minPrice', direction: 'desc' } },
    { name: 'Price (asc)', value: { name: 'minPrice', direction: 'asc' } },
    { name: 'Publication date (asc)', value: { name: 'publication', direction: 'asc' } },
    { name: 'Publication date (desc)', value: { name: 'publication', direction: 'desc' } }
  ];
  filtersForm: FormGroup
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

  constructor(
    private filterService: FilterService,
    private fb: FormBuilder,
    private bookService: BooksService,
    private toast: ToastrService
  ) {
    this.filtersForm = this.fb.group({
      searchParam: [''],
      fromDate: [''],
      toDate: [''],
      genres: [''],
      sale: [''],
      new: [''],
      bestSeller: ['']
    })
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

  onSearchChange(event: any) {
    console.log(this.booksFilter.searchPhrase)
    console.log(event)
  }

  searchTermChange(): void {

    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
    //debouncing
    //@ts-ignore
    this.timeout = setTimeout(() => {
      this.filterService.changeFilter(this.booksFilter);
    }, 1000);
  }

  filterBooks(): void {
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
    //@ts-ignore
    this.timeout = setTimeout(() => {
      const searchParam = this.filtersForm.get('searchParam').value;
      this.bookService.searchBooks(searchParam).subscribe({
        next: (res) => {
          console.log(res)
        },
        error: (err) => {
          console.log(err);
          this.toast.error('Error occurred');
        }
      });
    }, 1000);
  }
}
