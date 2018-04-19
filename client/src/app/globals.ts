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
    currentRole: any = Roles.NOTLOGED;
    showLoginDialog = false;
    todayDate = this.getTodayDate();
    tomorrowDate = this.getTomorrowyDate();

    // Pattern regexes
    namePattern = '[A-Z]{1}[a-z]*';
    usernamePattern = '[A-Za-z0-9]*';
    cityPattern = '[A-Z]{1}[a-z]*';
    streetPattern = '[A-Za-z0-9 ]*';


    public getTodayDate() {
        const now = new Date();
        const d = now.getDate();
        const m = now.getMonth();
        const y = now.getFullYear();
        const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        return '' + y + '-' + month[m] + '-' + d;
    }

    public getTomorrowyDate() {
        const now = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        const d = now.getDate();
        const m = now.getMonth();
        const y = now.getFullYear();
        const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        return '' + y + '-' + month[m] + '-' + d;
    }
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
