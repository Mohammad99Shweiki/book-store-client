import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {BooksFilter} from '../../models/booksFilter';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  filterSource: Subject<BooksFilter> = new Subject<BooksFilter>();
  filter$: Observable<BooksFilter> = this.filterSource.asObservable();

  constructor() {
  }

  changeFilter(filter: BooksFilter): void {
    this.filterSource.next(filter);
  }
}
