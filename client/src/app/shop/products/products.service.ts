import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { Product } from "./product";


@Injectable()
export class ProductsService {

    private apiUrl = 'http://localhost:8080/products/';  // URL to web api

    constructor(
        private http: HttpClient
    ){}

    /** GET products from the server */
    getProducts (): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl)
            .pipe(
                catchError(this.handleError('getProducts', []))
            );
    }


    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
