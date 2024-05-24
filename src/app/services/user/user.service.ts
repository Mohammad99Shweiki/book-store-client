import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from '@/models/userData';
import { END_POINTS, TABLE_ITEMS_PER_PAGE } from 'src/app/app.constants';
import { Book } from 'src/app/models/book';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getAllUsers(page: number = 0): Observable<any> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('page', page + '');
    httpParams = httpParams.set('size', TABLE_ITEMS_PER_PAGE + '');
    return this.http.get<any>(END_POINTS.USERS.index, { params: httpParams });
  }

  getUserData(): Observable<UserData> {
    const { id } = JSON.parse(localStorage.getItem('userData')) ?? null
    return this.http.get<UserData>(END_POINTS.USERS.index + '/' + id);
  }

  recommend(): Observable<Book[]> {
    const { id } = JSON.parse(localStorage.getItem('userData')) ?? null;
    return this.http.get<Book[]>(END_POINTS.USERS.RECOMMEND + '/' + id);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(END_POINTS.USERS.index + '/' + id);
  }

  updateProfile(id: string, data: any) {
    return this.http.put(END_POINTS.USERS.index + '/' + id, data)
  }
}
