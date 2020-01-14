import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../order';
import {User} from '../../../../_authentication/_models/user';
import {Globals} from '../../../../globals';
import * as jwtDecode from 'jwt-decode';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class OrderService {

    private apiUrl = 'http://localhost:8080/orders/';  // URL to web api

    constructor(
        private http: HttpClient,
        private globals: Globals
    ) {}

    // GET order from the server
    getOrders () {
        return this.http.get<Order[]>(this.apiUrl);
    }

    // GET order by id
    getOrder(id: number) {
        if (this.globals.currentRole === 1) {
            const username = jwtDecode(localStorage.getItem('token')).sub;
            return this.http.get<Order>(this.apiUrl + username + '/' + id);
        } else {
            return this.http.get<Order>(this.apiUrl + id);
        }

    }

    getUser(orderId: number) {
        return this.http.get<User>(this.apiUrl + orderId + '/user');
    }

    // POST: add a new order to the server
    addOrder (order: Order) {
        return this.http.post<Order>(this.apiUrl, JSON.stringify(order), httpOptions);
    }

    // DELETE: delete the order from the server
    delete (order: Order | number) {
        const id = typeof order === 'number' ? order : order.id;
        const url = `${this.apiUrl}${id}`;

        return this.http.delete<Order>(url, httpOptions);
    }

    // PUT: update the order on the server
    update (order: Order) {
        const id = typeof order === 'number' ? order : order.id;
        const url = `${this.apiUrl}${id}`;

        // this.http.put(this.userUrl + order.user.username, JSON.stringify(order.user), httpOptions);

        return this.http.put(url, JSON.stringify(order), httpOptions);
    }
}
