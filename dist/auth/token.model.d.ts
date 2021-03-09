import * as mongoose from 'mongoose';
export declare const TokenSchema: mongoose.Schema<any>;
export interface Token extends mongoose.Document {
    token: string;
}
