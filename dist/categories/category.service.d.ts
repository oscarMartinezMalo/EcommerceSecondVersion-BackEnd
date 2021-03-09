import { Category } from "./category.model";
import { Model } from "mongoose";
export declare class CategoryService {
    private readonly categoryModel;
    constructor(categoryModel: Model<Category>);
    insertCategory(id: string, name: string): Promise<string>;
    getCategories(): Promise<{
        id: string;
        name: string;
    }[]>;
    getSingleCategory(id: string): Promise<{
        id: string;
        name: string;
    }>;
    updateCategory(id: string, name: string): Promise<void>;
    deleteCategory(id: string): Promise<void>;
    findCategory(id: string): Promise<Category>;
}
