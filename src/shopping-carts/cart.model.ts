import * as mongoose from 'mongoose';

export const CartSchema = new mongoose.Schema({
    dateCreated: { type: String, required: true },
    items: [{
        product: {
            id: { type: String },
            title: { type: String },
            price: { type: Number },
            category: { type: String },
            imageUrl: { type: String },
            imagesUrls: [ {type: String} ]
        },
        quantity: { type: Number, default: 0 }
    }]
});

export interface Cart extends mongoose.Document {
    id?: string;
    dateCreated: string;
    items: Item[];
}

export interface Item{
    quantity: number,
    product: Product
}

interface Product {
    id?: string;
    title: string;
    price: number;
    category: string;
    imageUrl: string;
    imagesUrls: string[]
}