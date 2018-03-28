import {Product} from '../../shop/products/product';
import {User} from '../../../_authentication/_models/user'

export class Order {
    id: number;
    user: number;
    car: number;
    createDate: string;
    exportDate: string;
    state: string;
    products: Product[];
    user: User;

    constructor(car, createDate, exportDate, state, items) {
        this.car = car;
        this.createDate = createDate;
        this.exportDate = exportDate;
        this.state = state;
        this.products = items;
    }
}
