import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from '../../models/book';
import {environment} from '../../../environments/environment';
import {BooksFilter} from '../../models/booksFilter';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {
  }

  httpOptions: { headers: HttpHeaders, params?: HttpParams } = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  getLimitedBooks(limit: number, skip: number): Observable<Array<Book>> {
    this.httpOptions.params = new HttpParams()
      .append('limit', limit.toString())
      .append('skip', skip.toString());
    return this.http.get<Array<Book>>(environment.serverUrL + 'getLimitedBooks', this.httpOptions);
  }

  getBook(id: number): Observable<Book> {
    this.httpOptions.params = new HttpParams().append('id', id.toString());
    return this.http.get<Book>(environment.serverUrL + 'getBook', this.httpOptions);
  }

  getRecommendedBooks(id: number): Observable<Array<Book>> {
    this.httpOptions.params = new HttpParams().append('id', id.toString());
    return this.http.get<Array<Book>>(environment.serverUrL + 'getRecommendedBooks', this.httpOptions);
  }

  getBooksWithFilterPlaceholder(limit: number, skip: number, filter: BooksFilter): Observable<Array<Book>> {
    return this.http.post<Array<Book>>(environment.serverUrL + 'getBooksWithFilterPlaceholder',
      {limit, skip, ...filter},
      {headers: new HttpHeaders({'Content-Type': 'application/json'})}
      );
  }
}
