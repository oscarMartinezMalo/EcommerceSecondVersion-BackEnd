import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any>;
export interface User extends mongoose.Document {
    id: string;
    email: string;
    role: string;
    password: string;
    date: string;
    resetToken?: string;
}
