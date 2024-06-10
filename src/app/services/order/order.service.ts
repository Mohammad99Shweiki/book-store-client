import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart } from '@/models/cart';
import { Observable } from 'rxjs';
import { environment } from '@/../environments/environment';
import { END_POINTS } from '@/app.constants';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  placeOrder(address: string, phoneNo: string): Observable<any> {
    const { id } = JSON.parse(localStorage.getItem('userData'))
    debugger
    return this.http.post(END_POINTS.PURCHASE_CART + '/' + id, { address, phoneNo });
  }
}
