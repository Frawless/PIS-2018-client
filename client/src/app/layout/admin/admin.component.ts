import { Component, OnInit } from '@angular/core';

import * as jwtDecode from 'jwt-decode';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

    currentRole: string;

    constructor(
    ) {}

    ngOnInit() {
        this.getCurrentRoleFromToken();
    }

    getCurrentRoleFromToken() {
        const token = localStorage.getItem('token');
        if (token) {
            this.currentRole = jwtDecode(token).roles[0].authority;
        }

    }

    onChange() {
        this.getCurrentRoleFromToken();
    }
}
