import * as mongoose from 'mongoose';
export declare const OrderSchema: mongoose.Schema<any>;
export interface Order extends mongoose.Document {
    id?: string;
    status: string;
    billingAddress: BillingPayer;
    paypalOrderID?: string;
    userId: string;
    shipping: Shipping;
    datePlaced: string;
    items: OrderItem[];
}
export interface BillingPayer {
    paypalId: string;
    firtName: string;
    lastName: string;
    email: string;
}
export interface Shipping {
    name: string;
    address: string;
    apartment: string;
    zipCode: string;
    city: string;
    state: string;
    country: string;
    phone: number;
    email: string;
}
export interface OrderItem {
    product: Product;
    quantity: number;
    totalPrice: number;
}
interface Product {
    id?: string;
    title: string;
    price: number;
    imageUrl: string;
}
export {};
