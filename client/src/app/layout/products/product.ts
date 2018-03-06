/**/
import {Ingredient} from "./ingredients/ingredient";

export class Product {
    id: number;
    name: string;
    energyValue: number;
    totalAmount: number;
    ingredients: Ingredient[];
}

