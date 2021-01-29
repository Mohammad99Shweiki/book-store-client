import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {RegisterData} from '../../models/registerData';
import {LoginData} from '../../models/loginData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  isUserLogged(): boolean {
    return false;
  }

  registerUser(data: RegisterData): Observable<string> {
    return this.http.post<string>(environment.serverUrL + 'register', data);
  }

  loginUser(data: LoginData): Observable<string> {
    return this.http.post<string>(environment.serverUrL + 'login', data);
  }
}
