import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, min: 6, max: 255 },
    password: { type: String, required: true, min: 6, max: 1024 },
    role: { type: String, required: true },
    date: { type: String, default: Date.now },
    resetToken: { type: String, default: '' }
});

export interface User extends mongoose.Document {
    id: string,
    email: string;
    role: string;
    password: string;
    date: string;
    resetToken?: string;
}
