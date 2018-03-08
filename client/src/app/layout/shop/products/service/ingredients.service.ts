import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { Ingredient } from "../ingredients/ingredient";
import {catchError, retry} from "rxjs/operators";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {Observable} from "rxjs/Observable";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class IngredientsService {
  private apiUrl = 'http://localhost:8080/ingredients/';  // URL to web api

    constructor( private http: HttpClient ) { }

    // GET ingredient from the server
    getIngredients () {
        return this.http.get<Ingredient[]>(this.apiUrl);
    }

    // GET ingredient by id
    getIngredient(id: number) {
        return this.http.get<Ingredient>(this.apiUrl + id);
    }

    // POST: add a new ingredient to the server
    addIngredient (ingredient: Ingredient) {
        return this.http.post<Ingredient>(this.apiUrl, JSON.stringify(ingredient), httpOptions).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
        );
    }

    // PUT: update the product on the server
    update (ingredient: Ingredient): Observable<Ingredient> {
        const id = typeof ingredient === 'number' ? ingredient : ingredient.id;
        const url = `${this.apiUrl}${id}`;

        return this.http.put(url, JSON.stringify(ingredient), httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    // DELETE: delete the product from the server
    delete (ingredient: Ingredient | number) {
        const id = typeof ingredient === 'number' ? ingredient : ingredient.id;
        const url = `${this.apiUrl}${id}`;

        return this.http.delete<Ingredient>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }


    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an ErrorObservable with a user-facing error message
        return new ErrorObservable(
            'Something bad happened; please try again later.');
    };
}
