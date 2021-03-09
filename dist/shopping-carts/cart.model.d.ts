import * as mongoose from 'mongoose';
export declare const CartSchema: mongoose.Schema<any>;
export interface Cart extends mongoose.Document {
    id?: string;
    dateCreated: string;
    items: Item[];
}
export interface Item {
    quantity: number;
    product: Product;
}
interface Product {
    id?: string;
    title: string;
    price: number;
    category: string;
    imageUrl: string;
}
export {};
