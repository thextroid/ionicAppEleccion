import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private router: Router){}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        if(token){
            request = request.clone(
                {
                    setHeaders:{
                        'Authorization':token
                    }
                }
            )
        }
        if(!request.headers.has('Content-Type')){
            request = request.clone({
                setHeaders:{
                    'content-type':'application/json'
                }
            })
        }
        request = request.clone({
            headers: request.headers.set('Accept', 'application/json')
          });
        
          return next.handle(request);
    }
    
}
