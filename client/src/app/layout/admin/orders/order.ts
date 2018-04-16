import {Product} from '../../model/product';
import {User} from '../../../_authentication/_models/user'

export class Item {
    id: number;
    countOrdered: number;
    product: Product;
}

export class Address {
    city: string;
    psc: number;
    streetName: string;
    streetNumber: number;
}

export class Order {
    id: number;
    car: number;
    createDate: string;
    exportDate: string;
    state: string;
    items: Item[];
    user: User;
    address: Address;

    constructor(car, createDate, exportDate, user, state, items) {
        this.car = car;
        this.createDate = createDate;
        this.exportDate = exportDate;
        this.state = state;
        this.items = items;
    }
}

