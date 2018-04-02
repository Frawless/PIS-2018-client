
export class CartItem {
    public product_id: number;
    public quantity: number = 0;
}

export class ShoppingCart {
    public items: CartItem[] = new Array<CartItem>();
    public itemsTotal: number = 0;

    public updateFrom(src: ShoppingCart) {
        this.items = src.items;
        this.itemsTotal = src.itemsTotal;
    }
}
