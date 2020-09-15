import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './models/book';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}

  private booksUrl = 'https://book-server-pawelblaszczyk.herokuapp.com/';
  // private booksUrl = 'http://localhost:3000/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getLimitedBooks(limit: number, skip: number): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl + `limitskip/${limit}/${skip}`);
  }
  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(this.booksUrl + `getById/${id}`);
  }
}
