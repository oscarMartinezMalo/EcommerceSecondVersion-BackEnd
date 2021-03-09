import { Product } from "./product.model";
import { Model } from "mongoose";
export declare class ProductService {
    private readonly productModel;
    constructor(productModel: Model<Product>);
    insertProduct(title: string, price: number, category: string, imageUrl: string): Promise<string>;
    getProducts(): Promise<{
        id: string;
        title: string;
        price: number;
        category: string;
        imageUrl: string;
    }[]>;
    getSingleProduct(id: string): Promise<{
        id: string;
        title: string;
        price: number;
        category: string;
        imageUrl: string;
    }>;
    updateProduct(id: string, title: string, price: number, category: string, imageUrl: string): Promise<void>;
    deleteProduct(id: string): Promise<void>;
    findProduct(id: string): Promise<Product>;
}
