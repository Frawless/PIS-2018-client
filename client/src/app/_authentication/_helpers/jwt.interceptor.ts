import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const currentUser = localStorage.getItem('user');
        const userToken = localStorage.getItem('token');

        if (currentUser && userToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `${userToken}`
                }
            });
        }

        return next.handle(request);
    }
}
