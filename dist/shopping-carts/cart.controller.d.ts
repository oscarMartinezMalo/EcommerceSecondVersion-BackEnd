import { CartService } from "./cart.service";
import { Product } from "src/products/product.model";
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addCart(): Promise<{
        id: string;
    }>;
    getCart(cartId: string): Promise<import("./cart.model").Cart>;
    getItemToCard(cartId: string, product: Product, change: number): Promise<import("./cart.model").Cart>;
    removeProduct(cartId: string): Promise<import("./cart.model").Cart>;
}
