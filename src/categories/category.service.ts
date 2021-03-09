import { Injectable, NotFoundException } from "@nestjs/common";
import { Category } from "./category.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class CategoryService {

    constructor(@InjectModel('category') private readonly categoryModel: Model<Category>) { }

    async insertCategory(id: string, name: string) {
        const newCategory = new this.categoryModel({
            id: id,
            name: name
        });
        const result = await newCategory.save();
        return result.id as string;
    }

    async getCategories() {
        // Map the array since the object inside the array are reference Obj
        const categories = await this.categoryModel.find().sort({name: 1}).exec();
        return categories.map((category) => ({
            id: category.id,
            name: category.name
        }));
    }

    async getSingleCategory(id: string) {
        const category = await this.findCategory(id);
        return {
            id: category.id,
            name: category.name
        };
    }

    async updateCategory(id: string, name: string) {
        const updateCategory = await this.findCategory(id);
        if (name) { updateCategory.name = name; }

        updateCategory.save();
    }

    async deleteCategory(id: string) {
        const result = await this.categoryModel.deleteOne({ id: id }).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find Category');
        }
    }

    async findCategory(id: string): Promise<Category> {
        let category;
        try {            
            category = await this.categoryModel.findOne({ id: id }).exec();
        } catch (error) {
            throw new NotFoundException('Could not find category');
        }
        if (!category) {
            throw new NotFoundException('Could not find category');
        }
        return category;
    }
}