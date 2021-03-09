import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { AuthGuard } from "src/guards/auth.guard";


@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    //Ex. Poduct Format { "id": "bread", "name": "Bread" }
    @Post()
    async addProduct(@Body() completeBody: { id: string, name: string }) {
        const generatedId = await this.categoryService.insertCategory(completeBody.id, completeBody.name);
        return { id: generatedId };
    }

    @Get()
    async getAllCategories() {
        const categories = await this.categoryService.getCategories();
        return categories;
    }

    @Get(':id')
    getCategory(@Param('id') categoryId: string) {
        return this.categoryService.getSingleCategory(categoryId);
    }

    @Patch(':id')
    async updateCategory(@Param('id') categoryId: string, @Body('name') categoryName: string) {
        await this.categoryService.updateCategory(categoryId, categoryName);
        return null;
    }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    async removeCategory(@Param('id') categoryId: string) {
        await this.categoryService.deleteCategory(categoryId);
        return null;
    }
}