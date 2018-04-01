import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


export enum Roles {
    NOTLOGED = 0,
    USER = 1,
    EMPLOYEE = 2,
    ADMIN = 3
}

@Injectable()
export class Globals {
    alertLogin = false;
    showSideBar = false;
    title =  'Bakery';
    currentRole: any = Roles.NOTLOGED;
}


@Injectable()
export class DataService {

    private messageSource = new BehaviorSubject<string>('default message');
    currentMessage = this.messageSource.asObservable();

    constructor() {
    }

    changeMessage(message: string) {
        console.log('invoke message change');
        this.messageSource.next(message);
    }
}
