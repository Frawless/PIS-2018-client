import {Ingredient} from './ingredient';

export class Product {
    id: number;
    name: string;
    price: number;
    totalAmount: number;
    ingredients: Ingredient[];
    image: any;

    constructor(name, price, totalAmount, ingredients) {
        this.name = name;
        this.price = price;
        this.totalAmount = totalAmount;
        this.ingredients = ingredients;
    }
}
