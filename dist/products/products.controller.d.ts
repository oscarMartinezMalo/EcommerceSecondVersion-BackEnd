import { ProductService } from "./products.service";
import { Product } from "./product.model";
export declare class ProductsController {
    private readonly productServicer;
    constructor(productServicer: ProductService);
    addProduct(completeBody: Product): Promise<{
        id: string;
    }>;
    updateProduct(prodId: string, prodTitle: string, prodPrice: number, prodCategory: string, prodImageUrl: string): Promise<any>;
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
    }>;
    removeProduct(prodId: string): Promise<any>;
}
