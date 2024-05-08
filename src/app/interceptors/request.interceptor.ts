import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { SERVER_API_URL } from "../app.constants";

export class RequestInterceptor implements HttpInterceptor {  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const request = req.clone({
      url: SERVER_API_URL + req.url,
      headers
    })
    return next.handle(request)
  }

}