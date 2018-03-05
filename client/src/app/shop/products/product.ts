/**/
import {Ingredient} from "./ingredient";

export class Product {
    id: number;
    name: string;
    energyValue: number;
    totalAmount: number;
    ingredients: Ingredient[];
}

