import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RegisterData } from '@/models/registerData';
import { LoginData } from '@/models/loginData';
import { AuthResponse } from '@/models/authResponse';
import { LoginResponse } from '@/models/loginResponse';
import { Router, UrlTree } from '@angular/router';
import { END_POINTS, ROLES } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _loggedIn: boolean = false;
  loggedInChange: Subject<boolean> = new Subject();
  adminLoggedInChange: Subject<boolean> = new Subject();

  constructor(private http: HttpClient, private router: Router) {
    this.loggedInChange.subscribe(val => this._loggedIn = val)
    this.checkUserData()
  }

  checkIfAdmin(): Observable<boolean> {
    const data: { role: string } = JSON.parse(localStorage.getItem('userData'));
    if (data && data && data.role === ROLES.ADMIN) {
      return of(true)
    } else {
      this.adminLoggedInChange.next(false);
      return of(false);
    }
  }

  checkUserData(): Observable<boolean | UrlTree> {
    const data: { token: string, id: string } = JSON.parse(localStorage.getItem('userData'));
    if (data) {
      return of(true);
      // return this.http.post<boolean>(environment.serverUrL + 'authenticate', data).pipe(map((value: boolean) => {
      //   if (!value) {
      //     localStorage.removeItem('userData');
      //   }
      //   return value || this.router.createUrlTree(['/login']);
      // }));
    } else {
      this.loggedInChange.next(false)
      return of(this.router.createUrlTree(['/login']));
    }
  }

  loggedIn() {
    return this._loggedIn;
  }

  registerUser(data: RegisterData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(END_POINTS.AUTH.SIGN_UP, data);
  }

  loginUser(data: LoginData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(END_POINTS.AUTH.LOG_IN, data);
  }
}
