import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@/../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  sendContactMessage(data): Observable<boolean> {
    return this.http.post<boolean>(environment.serverUrL + 'sendContact', data);
  }
}
