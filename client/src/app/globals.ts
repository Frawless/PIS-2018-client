import { Injectable } from '@angular/core';


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

