import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart } from '@/models/cart';
import { Observable } from 'rxjs';
import { environment } from '@/../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  placeOrder(cart: Cart, value: number): Observable<boolean> {
    return this.http.post<boolean>(environment.serverUrL + 'placeOrder',
      { cart, value, userData: JSON.parse(localStorage.getItem('userData')) });
  }
}
