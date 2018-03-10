import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../product';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProductsService {

    private apiUrl = 'http://localhost:8080/products/';  // URL to web api

    constructor( private http: HttpClient ) {}

    // GET products from the server
    getProducts () {
        return this.http.get<Product[]>(this.apiUrl);
    }

    // GET product by id
    getProduct(id: number) {
      return this.http.get<Product>(this.apiUrl + id);
    }

    // POST: add a new product to the server
    addProduct (product: Product) {
        return this.http.post<Product>(this.apiUrl, JSON.stringify(product), httpOptions);
    }

    // DELETE: delete the product from the server
    delete (product: Product | number) {
        const id = typeof product === 'number' ? product : product.id;
        const url = `${this.apiUrl}${id}`;

        return this.http.delete<Product>(url, httpOptions);
    }

    // PUT: update the product on the server
    update (product: Product) {
        const id = typeof product === 'number' ? product : product.id;
        const url = `${this.apiUrl}${id}`;

        return this.http.put(url, JSON.stringify(product), httpOptions);
    }
}
