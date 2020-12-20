import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Review} from './models/review';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  };

  getReviewsByBookId(id: number): Observable<Review[]> {
    return this.http.get<Review[]>( environment.serverUrL + `getReviewsByBookId/${id}`);
  }
}
