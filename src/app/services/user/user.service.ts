import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from '../../models/userData';
import { environment } from '../../../environments/environment';
import { END_POINTS } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUserData(): Observable<UserData> {
    const { id } = JSON.parse(localStorage.getItem('userData')) ?? null
    return this.http.get<UserData>(END_POINTS.USERS.index + '/' + id);
  }
}
