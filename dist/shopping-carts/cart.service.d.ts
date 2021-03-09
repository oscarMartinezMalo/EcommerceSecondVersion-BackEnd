import { Cart } from "./cart.model";
import { Model } from "mongoose";
import { Product } from "src/products/product.model";
export declare class CartService {
    private readonly cartModel;
    constructor(cartModel: Model<Cart>);
    createEmptyCart(): Promise<string>;
    addProductToCard(cartId: string, product: Product, change: number): Promise<Cart>;
    addItemOrDeleteFromCart(cart: Cart, product: Product, change: number): Promise<void>;
    addNotExistItem(cart: any, cartId: any, product: any): Promise<void>;
    getCartById(cartId: string): Promise<Cart>;
    deleteAllProductFromCart(cartId: string): Promise<Cart>;
}
