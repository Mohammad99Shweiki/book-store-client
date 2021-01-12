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

  getBook(id: number): Observable<Book> {
    this.httpOptions.params = new HttpParams().append('id', id.toString());
    return this.http.get<Book>(environment.serverUrL + 'getBook', this.httpOptions);
  }

  getRecommendedBooks(id: number): Observable<Array<Book>> {
    this.httpOptions.params = new HttpParams().append('id', id.toString());
    return this.http.get<Array<Book>>(environment.serverUrL + 'getRecommendedBooks', this.httpOptions);
  }

  getSales(): Observable<Array<Book>> {
    return this.http.get<Array<Book>>(environment.serverUrL + 'getSales', {headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }

  getNew(): Observable<Array<Book>> {
    return this.http.get<Array<Book>>(environment.serverUrL + 'getNew', {headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }

  getBestsellers(): Observable<Array<Book>> {
    return this.http.get<Array<Book>>(environment.serverUrL + 'getBestsellers', {headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }

  getBooks(limit: number, skip: number, filter: BooksFilter): Observable<Array<Book>> {
    return this.http.post<Array<Book>>(environment.serverUrL + 'getBooks',
      {limit, skip, ...filter},
      {headers: new HttpHeaders({'Content-Type': 'application/json'})}
      );
  }
}
