import { Component, OnInit } from '@angular/core';
import {Globals} from '../globals';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    constructor(
        private globals: Globals,
    ) {}

    ngOnInit() {}

    onChange() {
        this.globals.currentRole = localStorage.getItem('role');
    }
}
