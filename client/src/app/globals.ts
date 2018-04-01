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

    private iddleLogoutSource = new BehaviorSubject<boolean>(false);
    iddleLogout = this.iddleLogoutSource.asObservable();

    constructor() {
    }

    changeMessage(state: boolean) {
        this.iddleLogoutSource.next(state);
    }
}
