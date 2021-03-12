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
let ProductService = class ProductService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async insertProduct(title, price, category, imageUrl, files) {
        if (files.length <= 0)
            throw new common_1.BadRequestException('At least one Image is Required');
        let imagesUrls = files.map(x => { return process.env.LOCAL_URL + x.filename; });
        const newProduct = new this.productModel({ title, price, category, imageUrl, imagesUrls });
        const result = await newProduct.save();
        return result.id;
    }
    async getProducts() {
        const products = await this.productModel.find().exec();
        return products.map((prod) => ({
            id: prod.id,
            title: prod.title,
            price: prod.price,
            category: prod.category,
            imageUrl: prod.imageUrl
        }));
    }
    async getSingleProduct(id) {
        const product = await this.findProduct(id);
        return {
            id: product.id,
            title: product.title,
            price: product.price,
            category: product.category,
            imageUrl: product.imageUrl,
            imagesUrls: product.imagesUrls,
        };
    }
    async updateProduct(id, title, price, category, imageUrl, imagesUrls, files) {
        const updateProduct = await this.findProduct(id);
        if (title) {
            updateProduct.title = title;
        }
        if (price) {
            updateProduct.price = price;
        }
        if (category) {
            updateProduct.category = category;
        }
        if (imageUrl) {
            updateProduct.imageUrl = imageUrl;
        }
        updateProduct.save();
    }
    async deleteProduct(id) {
        const result = await this.productModel.deleteOne({ _id: id }).exec();
        if (result.n === 0) {
            throw new common_1.NotFoundException('Could not find product');
        }
    }
    async findProduct(id) {
        let product;
        try {
            product = await this.productModel.findById(id);
        }
        catch (error) {
            throw new common_1.NotFoundException('Could not find product');
        }
        if (!product) {
            throw new common_1.NotFoundException('Could not find product');
        }
        return product;
    }
};
ProductService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Product')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=products.service.js.map