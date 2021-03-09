"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CategoryService = class CategoryService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    async insertCategory(id, name) {
        const newCategory = new this.categoryModel({
            id: id,
            name: name
        });
        const result = await newCategory.save();
        return result.id;
    }
    async getCategories() {
        const categories = await this.categoryModel.find().sort({ name: 1 }).exec();
        return categories.map((category) => ({
            id: category.id,
            name: category.name
        }));
    }
    async getSingleCategory(id) {
        const category = await this.findCategory(id);
        return {
            id: category.id,
            name: category.name
        };
    }
    async updateCategory(id, name) {
        const updateCategory = await this.findCategory(id);
        if (name) {
            updateCategory.name = name;
        }
        updateCategory.save();
    }
    async deleteCategory(id) {
        const result = await this.categoryModel.deleteOne({ id: id }).exec();
        if (result.n === 0) {
            throw new common_1.NotFoundException('Could not find Category');
        }
    }
    async findCategory(id) {
        let category;
        try {
            category = await this.categoryModel.findOne({ id: id }).exec();
        }
        catch (error) {
            throw new common_1.NotFoundException('Could not find category');
        }
        if (!category) {
            throw new common_1.NotFoundException('Could not find category');
        }
        return category;
    }
};
CategoryService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('category')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map