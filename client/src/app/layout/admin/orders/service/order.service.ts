import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../order';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class OrderService {

    private apiUrl = 'http://localhost:8080/orders/';  // URL to web api

    constructor( private http: HttpClient ) {}

    // GET products from the server
    getOrders () {
        return this.http.get<Order[]>(this.apiUrl);
    }

    // GET product by id
    getOrder(id: number) {
        return this.http.get<Order>(this.apiUrl + id);
    }

    getUser(orderId: number) {
        return this.http.get<Order>(this.apiUrl + orderId + '/user');
    }

    // POST: add a new product to the server
    addOrder (order: Order) {
        return this.http.post<Order>(this.apiUrl, JSON.stringify(order), httpOptions);
    }

    // DELETE: delete the product from the server
    deleteOrder (order: Order | number) {
        const id = typeof order === 'number' ? order : order.id;
        const url = `${this.apiUrl}${id}`;

        return this.http.delete<Order>(url, httpOptions);
    }

    // PUT: update the product on the server
    updateOrder (order: Order) {
        const id = typeof order === 'number' ? order : order.id;
        const url = `${this.apiUrl}${id}`;

        return this.http.put(url, JSON.stringify(order), httpOptions);
    }
}
