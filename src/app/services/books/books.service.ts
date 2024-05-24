import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '@/models/book';
import { environment } from '@/../environments/environment';
import { END_POINTS, TABLE_ITEMS_PER_PAGE } from 'src/app/app.constants';
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

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(END_POINTS.BOOKS + '/' + id);
  }

  updateBook(id: string, book: Book): Observable<string> {
    return this.http.put<string>(END_POINTS.BOOKS + '/' + id, book);
  }

  deleteBook(id: string) {
    return this.http.delete(END_POINTS.BOOKS + '/' + id);
  }

  getBooks(page: number = 0, search: string = ''): Observable<any> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('page', page + '');
    httpParams = httpParams.set('size', TABLE_ITEMS_PER_PAGE + '');
    // httpParams = httpParams.set('sort', 'isbn');
    return this.http.get<BooksResponse>(END_POINTS.BOOKS, { params: httpParams }).pipe(map((res: any) => res));
  }

  searchBooks(searchParam: string): Observable<any> {
    const filters = {};
    filters['query'] = searchParam;
    return this.http.get<Book[]>(END_POINTS.BOOKS_SEARCH + '/', { params: filters })
  }

  addBook(book: any): Observable<any> {
    return this.http.post(END_POINTS.BOOKS, book);
  }

  getSimilarBooks(bookId: string): Observable<Book[]> {
    return this.http.get<Book[]>(END_POINTS.BOOKS_SIMILAR + '/' + bookId);
  }

  getRecommendedBooks(id: number): Observable<Array<Book>> {
    this.httpOptions.params = new HttpParams().append('id', id.toString());
    return this.http.get<Array<Book>>(environment.serverUrL + 'getRecommendedBooks', this.httpOptions);
  }

  getBooksSales(): Observable<Array<Book>> {
    return this.http.get<Array<Book>>(END_POINTS.BOOKS_SALES).pipe(map((res: any) => res.content));;
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
