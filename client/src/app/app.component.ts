import { Component, OnInit } from '@angular/core';
import {Globals} from "./globals";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }

    title = 'Bakery';
}
