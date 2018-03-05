import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { Product } from "./product";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

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

    // GET product by id. Will 404 if id not found
    getProduct(id: number): Observable<Product> {
      const url = `${this.apiUrl}${id}`;
      return this.http.get<Product>(url).pipe(
        //tap(_ => this.log(`fetched product id=${id}`)),
        catchError(this.handleError<Product>(`getProduct id=${id}`))
      );
    }

    //////// Save methods //////////
    // POST: add a new product to the server

    addProduct (product: Product): Observable<Product> {
        return this.http.post<Product>(this.apiUrl, product, httpOptions).pipe(
            catchError(this.handleError<Product>('addProduct'))
        );
    }
/*
    // DELETE: delete the product from the server
    deleteHero (product: Product | number): Observable<Product> {
        const id = typeof product === 'number' ? product : product.id;
        const url = `${this.apiUrl}/${id}`;

        return this.http.delete<Product>(url, httpOptions).pipe(
            catchError(this.handleError<Product>('deleteProduct'))
        );
    }

    // PUT: update the product on the server
    updateHero (product: Product): Observable<any> {
        return this.http.put(this.apiUrl, product, httpOptions).pipe(
            catchError(this.handleError<any>('updateProduct'))
        );
    }
*/

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
