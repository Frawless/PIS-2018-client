﻿import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../_models/user';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

    private usersUrl = 'http://localhost:8080/users/';

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>('/api/users');
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id);
    }

    getCurrentUser(username: string) {
        return this.http.get<User>(this.usersUrl + username);
    }

    create(user: User) {
        return this.http.post<User>(this.usersUrl + "sing-up", user, httpOptions);
    }

    update(user: User) {
        return this.http.put(this.usersUrl + user.username, JSON.stringify(user), httpOptions);
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id);
    }
}
