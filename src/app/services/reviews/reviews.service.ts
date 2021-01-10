import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Review} from '../../models/review';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) {
  }

  httpOptions: {headers: HttpHeaders, params?: HttpParams} = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  getLimitedReviews(id: number, limit: number, skip: number): Observable<Array<Review>> {
    this.httpOptions.params = new HttpParams()
      .append('id', id.toString())
      .append('limit', limit.toString())
      .append('skip', skip.toString());
    return this.http.get<Array<Review>>( environment.serverUrL + 'getLimitedReviews', this.httpOptions);
  }

  getNumberOfReviews(id: number): Observable<number> {
    this.httpOptions.params = new HttpParams().append('id', id.toString());
    return this.http.get<number>( environment.serverUrL + 'getNumberOfReviews', this.httpOptions);
  }

}
