import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Car } from "../car";
import { Order } from "../../orders/order";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class CarsService {

    private apiUrl = 'http://localhost:8080/cars/';  // URL to web api

    constructor( private http: HttpClient ) { }

    // GET cars from the server
    getCars () {
        return this.http.get<Car[]>(this.apiUrl);
    }

    // GET car by id
    getCar(id: number) {
        return this.http.get<Car>(this.apiUrl + id);
    }

    // GET car's orders
    getCarOrders(id: number) {
        return this.http.get<Order>(this.apiUrl + id + "/orders")
    }

    // POST: add a new car to the server
    add(car: Car) {
        return this.http.post<Car>(this.apiUrl, JSON.stringify(car), httpOptions);
    }

    // PUT: update the car on the server
    update(car: Car) {
        const id = typeof car === 'number' ? car: car.id;
        const url = `${this.apiUrl}${id}`;

        return this.http.put(url, JSON.stringify(car), httpOptions);
    }

    // DELETE: delete the car from the server
    delete(car: Car | number) {
        const id = typeof car === 'number' ? car: car.id;
        const url = `${this.apiUrl}${id}`;

        return this.http.delete<Car>(url, httpOptions);
    }

}
