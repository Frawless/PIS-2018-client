import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ingredient } from '../model/ingredient';
import {Observable} from "rxjs/Observable";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class IngredientsService {

    private apiUrl = 'http://localhost:8080/ingredients/';  // URL to web api

    constructor( private http: HttpClient ) { }

    // GET ingredients from the server
    getIngredients (): Observable<Ingredient[]> {
        return this.http.get<Ingredient[]>(this.apiUrl);
    }

    // GET ingredient by id
    getIngredient(id: number): Observable<Ingredient> {
        return this.http.get<Ingredient>(this.apiUrl + id);
    }

    // POST: add a new ingredient to the server
    addIngredient (ingredient: Ingredient): Observable<Ingredient> {
        return this.http.post<Ingredient>(this.apiUrl, JSON.stringify(ingredient), httpOptions);
    }

    // PUT: update the product on the server
    update (ingredient: Ingredient): Observable<any> {
        const id = typeof ingredient === 'number' ? ingredient : ingredient.id;
        const url = `${this.apiUrl}${id}`;

        return this.http.put(url, JSON.stringify(ingredient), httpOptions);
    }

    // DELETE: delete the product from the server
    delete (ingredient: Ingredient | number): Observable<Ingredient> {
        const id = typeof ingredient === 'number' ? ingredient : ingredient.id;
        const url = `${this.apiUrl}${id}`;

        return this.http.delete<Ingredient>(url, httpOptions);
    }
}
