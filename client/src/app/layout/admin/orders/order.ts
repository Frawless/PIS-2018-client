import {Product} from '../../model/product';
import {User} from '../../../_authentication/_models/user'
import {Car} from "../../model/car";

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
    car: Car;
    createDate: string;
    exportDate: string;
    state: string;
    items: Item[];
    user: User;
    address: Address;
    price: number;

    constructor(car, createDate, exportDate, user, state, items) {
        this.car = car;
        this.createDate = createDate;
        this.exportDate = exportDate;
        this.state = state;
        this.items = items;
    }
}

