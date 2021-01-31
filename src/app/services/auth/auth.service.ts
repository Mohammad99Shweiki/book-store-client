import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {RegisterData} from '../../models/registerData';
import {LoginData} from '../../models/loginData';
import {AuthResponse} from '../../models/authResponse';
import {LoginResponse} from '../../models/loginResponse';
import {map} from 'rxjs/operators';
import {Router, UrlTree} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {
  }

  checkUserData(): Observable<boolean | UrlTree> {
    const data: {jwt: string, userId: string} = JSON.parse(localStorage.getItem('userData'));
    if (data) {
      return this.http.post<boolean>(environment.serverUrL + 'authenticate', data).pipe(map((value: boolean) => {
        if (!value) {
          localStorage.removeItem('userData');
        }
        return value || this.router.createUrlTree(['/getUser']);
      }));
    } else {
      return of(this.router.createUrlTree(['/getUser']));
    }
  }

  registerUser(data: RegisterData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.serverUrL + 'register', data);
  }

  loginUser(data: LoginData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.serverUrL + 'login', data);
  }
}
