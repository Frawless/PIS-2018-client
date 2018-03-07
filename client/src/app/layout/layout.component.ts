import { Component, OnInit } from '@angular/core';
import {Globals} from '../globals';

import * as jwtDecode from 'jwt-decode';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    currentRole: string;

    constructor(
        private globals: Globals,
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
