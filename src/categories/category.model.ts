import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true }
});

export interface Category extends mongoose.Document {
    id: string;
    name: string;
}
