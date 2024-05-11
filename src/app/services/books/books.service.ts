import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../../models/book';
import { environment } from '../../../environments/environment';
import { END_POINTS } from 'src/app/app.constants';
import { BooksResponse } from 'src/app/models/books-response';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) { }

  httpOptions: { headers: HttpHeaders, params?: HttpParams } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(END_POINTS.BOOKS + '/' + id);
  }

  getBooks(isBestSeller = false): Observable<any> {
    return this.http.get<BooksResponse>(END_POINTS.BOOKS).pipe(map((res: any) => res.content));
  }

  addBook(book: any): Observable<any> {
    return this.http.post(END_POINTS.BOOKS, book);
  }

  updateBook() {

  }

  getRecommendedBooks(id: number): Observable<Array<Book>> {
    this.httpOptions.params = new HttpParams().append('id', id.toString());
    return this.http.get<Array<Book>>(environment.serverUrL + 'getRecommendedBooks', this.httpOptions);
  }

  getSales(): Observable<Array<Book>> {
    return this.http.get<Array<Book>>(environment.serverUrL + 'getSales', { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  getNew(): Observable<Array<Book>> {
    return this.http.get<Array<Book>>(environment.serverUrL + 'getNew', { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  getBestsellers(): Observable<Array<Book>> {
    return this.http.get<Array<Book>>(environment.serverUrL + 'getBestsellers', { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  getBooksByIds(ids: Array<string>): Observable<Array<Book>> {
    return this.http.post<Array<Book>>(environment.serverUrL + 'getBooksByIds', { ids });
  }
}
