import { CategoryService } from "./category.service";
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    addProduct(completeBody: {
        id: string;
        name: string;
    }): Promise<{
        id: string;
    }>;
    getAllCategories(): Promise<{
        id: string;
        name: string;
    }[]>;
    getCategory(categoryId: string): Promise<{
        id: string;
        name: string;
    }>;
    updateCategory(categoryId: string, categoryName: string): Promise<any>;
    removeCategory(categoryId: string): Promise<any>;
}
