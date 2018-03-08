import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Product } from '../product';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProductsService {

    private apiUrl = 'http://localhost:8080/products/';  // URL to web api

    constructor( private http: HttpClient ) {}

    // GET products from the server
    getProducts (): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl);
    }

    // GET product by id
    getProduct(id: number): Observable<Product> {
      return this.http.get<Product>(this.apiUrl + id);
    }

    // POST: add a new product to the server
    addProduct (product: Product): Observable<Product> {
        return this.http.post<Product>(this.apiUrl, product, httpOptions);
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
}
