import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from '../models/book';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  };

  getBooksWithLimitAndSkip(limit: number, skip: number): Observable<Book[]> {
    return this.http.get<Book[]>(environment.serverUrL + `limitSkip/${limit}/${skip}`);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(environment.serverUrL + `getBookById/${id}`);
  }
}
