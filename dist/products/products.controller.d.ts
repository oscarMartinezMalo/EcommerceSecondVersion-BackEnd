/// <reference types="multer" />
import { ProductService } from "./products.service";
import { Product } from "./product.model";
export declare class ProductsController {
    private readonly productServicer;
    constructor(productServicer: ProductService);
    addProduct(completeBody: Product, files: Express.Multer.File[]): Promise<{
        id: string;
    }>;
    updateProduct(prodId: string, prodTitle: string, prodPrice: number, prodCategory: string, imageUrl: string, imagesUrls: string[], files: Express.Multer.File[]): Promise<any>;
    getAllProducts(): Promise<{
        id: string;
        title: string;
        price: number;
        category: string;
        imageUrl: string;
    }[]>;
    getProduct(prodId: string): Promise<{
        id: string;
        title: string;
        price: number;
        category: string;
        imageUrl: string;
        imagesUrls: string[];
    }>;
    removeProduct(prodId: string): Promise<any>;
}
