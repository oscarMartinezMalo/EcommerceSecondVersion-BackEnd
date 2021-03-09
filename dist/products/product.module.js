"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const products_controller_1 = require("./products.controller");
const products_service_1 = require("./products.service");
const mongoose_1 = require("@nestjs/mongoose");
const product_model_1 = require("./product.model");
let ProductModule = class ProductModule {
    configure(consumer) {
    }
};
ProductModule = __decorate([
    common_1.Module({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'Product', schema: product_model_1.ProductSchema }])],
        controllers: [products_controller_1.ProductsController],
        providers: [products_service_1.ProductService],
        exports: [products_service_1.ProductService]
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map