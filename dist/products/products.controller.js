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
const products_service_1 = require("./products.service");
const joi_validation_pipe_1 = require("../pipes/joi-validation.pipe");
const product_joi_validation_1 = require("./product-joi.validation");
const auth_guard_1 = require("../guards/auth.guard");
const user_decorator_1 = require("../decorators/user.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const file_upload_utils_1 = require("../common/file-upload.utils");
let ProductsController = class ProductsController {
    constructor(productServicer) {
        this.productServicer = productServicer;
    }
    async addProduct(completeBody, files) {
        const generatedId = await this.productServicer.insertProduct(completeBody.title, completeBody.price, completeBody.category, completeBody.imageUrl, files);
        return { id: generatedId };
    }
    async updateProduct(prodId, prodTitle, prodPrice, prodCategory, imageUrl, imagesUrls, files) {
        await this.productServicer.updateProduct(prodId, prodTitle, prodPrice, prodCategory, imageUrl, imagesUrls, files);
        return null;
    }
    async getAllProducts() {
        const products = await this.productServicer.getProducts();
        return products;
    }
    getProduct(prodId) {
        return this.productServicer.getSingleProduct(prodId);
    }
    async removeProduct(prodId) {
        await this.productServicer.deleteProduct(prodId);
        return null;
    }
};
__decorate([
    common_1.UseInterceptors(platform_express_1.FilesInterceptor('files', 5, {
        storage: multer_1.diskStorage({
            destination: './public',
            filename: file_upload_utils_1.editFileName,
        }),
        fileFilter: file_upload_utils_1.imageFileFilter,
    })),
    common_1.Post(),
    common_1.UsePipes(new joi_validation_pipe_1.JoiValidationPipe(product_joi_validation_1.ProductValidationSchema)),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, common_1.Body()),
    __param(1, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "addProduct", null);
__decorate([
    common_1.UseInterceptors(platform_express_1.FilesInterceptor('files', 5, {
        storage: multer_1.diskStorage({
            destination: './public',
            filename: file_upload_utils_1.editFileName,
        }),
        fileFilter: file_upload_utils_1.imageFileFilter,
    })),
    common_1.Patch(':id'),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body('title')),
    __param(2, common_1.Body('price')),
    __param(3, common_1.Body('category')),
    __param(4, common_1.Body('imageUrl')),
    __param(5, common_1.Body('imagesUrls')),
    __param(6, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, String, String, Array, Array]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateProduct", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getAllProducts", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getProduct", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "removeProduct", null);
ProductsController = __decorate([
    common_1.Controller('products'),
    __metadata("design:paramtypes", [products_service_1.ProductService])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map