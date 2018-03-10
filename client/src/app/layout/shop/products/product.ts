import {Ingredient} from './ingredients/ingredient';

export class Product {
    id: number;
    name: string;
    energyValue: number;
    totalAmount: number;
    ingredients: Ingredient[];

    constructor(name, energyValue, totalAmount, ingredients) {
        this.name = name;
        this.energyValue = energyValue;
        this.totalAmount = totalAmount;
        this.ingredients = ingredients;
    }
}
