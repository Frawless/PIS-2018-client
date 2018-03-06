import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/Rx';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'my-auth-token' })
};

@Injectable()
export class AuthenticationService {

    private loginUrl = 'http://localhost:8080/login';

    constructor(private http: HttpClient) { }

    login(data: Credentials) {

      return this.http.post<any>(this.loginUrl, data,
          {
              observe: 'response',
              headers: new HttpHeaders()
                  .set('Content-Type', 'X-Requested-With')
          })
            .map(response => {
                // console.log(response.headers.get('Authorization'));
                // console.log(response.headers);
                // console.log(data);

                const token = response.headers.get('Authorization');

                if (data.username && token) {
                    localStorage.setItem('user', data.username);
                    localStorage.setItem('token', token);
                }

            return response;
        });

    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}

interface Credentials {
    username?: string
    password?: string
}
