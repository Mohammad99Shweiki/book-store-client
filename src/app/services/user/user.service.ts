import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserData} from '../../models/userData';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUserData(): Observable<UserData> {
    return this.http.post<UserData>(environment.serverUrL + 'userData', JSON.parse(localStorage.getItem('userData')));
  }
}
