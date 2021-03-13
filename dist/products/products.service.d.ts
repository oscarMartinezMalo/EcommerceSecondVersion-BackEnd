/// <reference types="multer" />
import { Product } from "./product.model";
import { Model } from "mongoose";
export declare class ProductService {
    private readonly productModel;
    constructor(productModel: Model<Product>);
    insertProduct(title: string, price: number, category: string, imageUrl: string, files: Express.Multer.File[]): Promise<string>;
    getProducts(): Promise<{
        id: string;
        title: string;
        price: number;
        category: string;
        imageUrl: string;
        imagesUrls: string[];
    }[]>;
    getSingleProduct(id: string): Promise<{
        id: string;
        title: string;
        price: number;
        category: string;
        imageUrl: string;
        imagesUrls: string[];
    }>;
    updateProduct(id: string, title: string, price: number, category: string, imageUrl: string, imagesUrls: string[], files: Express.Multer.File[]): Promise<void>;
    deleteProduct(id: string): Promise<void>;
    findProduct(id: string): Promise<Product>;
}
