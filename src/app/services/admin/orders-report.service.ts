import { END_POINTS } from '@/app.constants';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersReportService {

  constructor(private httpClient: HttpClient) { }

  getOrdersReport(page: number = 0): Observable<any> {
    let httpParams = new HttpParams();
    httpParams.set('page', page + '');
    return this.httpClient.get(END_POINTS.REPORT, { params: httpParams });
  }
}
