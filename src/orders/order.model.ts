import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true},
    paypalOrderID: { type: String, required: true },
    datePlaced: { type: String, required: true },
    billingPayer: {
        paypalId: String,
        firtName: String,
        lastName: String,
        email: String,
    },
    shipping: { 
        name: { type: String },
        address: { type: String },
        apartment: { type: String },
        zipCode: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        phone:  { type: Number },
        email: { type: String },
    },
    items: [{
        product: {
            title: { type: String },
            price: { type: Number },
            imageUrl: { type: String },
        },
        quantity: { type: Number, default: 0 },
        totalPrice: { type: Number, default: 0 }
    }]
});

export interface Order extends mongoose.Document {
    id?: string;
    status: string;
    billingAddress: BillingPayer
    paypalOrderID?: string;
    userId: string;
    shipping: Shipping;
    datePlaced: string;
    items: OrderItem[];
}

export interface  BillingPayer{
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