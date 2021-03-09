import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    // images: [ {type: String} ]
});

export interface Product extends mongoose.Document {
    id?: string;
    title: string;
    price: number;
    category: string;
    imageUrl: string;
    // images: string[];
}
