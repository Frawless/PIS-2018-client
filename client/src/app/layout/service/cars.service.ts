import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Car } from "../model/car";
import { Order } from "../admin/orders/order";
import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class CarsService {

    private apiUrl = 'http://localhost:8080/cars/';  // URL to web api

    constructor( private http: HttpClient ) { }

    // GET cars from the server
    getCars(): Observable<Car[]> {
        return this.http.get<Car[]>(this.apiUrl);
    }

    // GET car by id
    getCar(id: number): Observable<Car> {
        return this.http.get<Car>(this.apiUrl + id);
    }

    // POST: add a new car to the server
    add(car: Car): Observable<Car> {
        return this.http.post<Car>(this.apiUrl, JSON.stringify(car), httpOptions);
    }

    // PUT: update the car on the server
    update(car: Car): Observable<any> {
        const id = typeof car === 'number' ? car: car.id;
        const url = `${this.apiUrl}${id}`;

        return this.http.put(url, JSON.stringify(car), httpOptions);
    }

    // DELETE: delete the car from the server
    delete(car: Car | number): Observable<Car> {
        const id = typeof car === 'number' ? car: car.id;
        const url = `${this.apiUrl}${id}`;

        return this.http.delete<Car>(url, httpOptions);
    }

}
