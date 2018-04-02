import {Product} from '../../model/product';
import {User} from '../../../_authentication/_models/user'

export class Item {
    id: number;
    countOrdered: number;
    product: Product;
}

export class Order {
    id: number;
    car: number;
    createDate: string;
    exportDate: string;
    state: string;
    items: Item[];
    user: User;

    constructor(car, createDate, exportDate, state, items) {
        this.car = car;
        this.createDate = createDate;
        this.exportDate = exportDate;
        this.state = state;
        this.items = items;
    }
}
