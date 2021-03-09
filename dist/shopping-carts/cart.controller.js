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
const cart_service_1 = require("./cart.service");
const product_model_1 = require("../products/product.model");
let CartController = class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    async addCart() {
        const cartId = await this.cartService.createEmptyCart();
        return { id: cartId };
    }
    async getCart(cartId) {
        const cart = await this.cartService.getCartById(cartId);
        return cart;
    }
    async getItemToCard(cartId, product, change) {
        const cart = await this.cartService.addProductToCard(cartId, product, change);
        return cart;
    }
    async removeProduct(cartId) {
        const cart = await this.cartService.deleteAllProductFromCart(cartId);
        return cart;
    }
};
__decorate([
    common_1.Get('create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addCart", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getCart", null);
__decorate([
    common_1.Post('update-item-quantity'),
    __param(0, common_1.Body('cartId')),
    __param(1, common_1.Body('product')),
    __param(2, common_1.Body('change')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getItemToCard", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "removeProduct", null);
CartController = __decorate([
    common_1.Controller('cart'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
exports.CartController = CartController;
//# sourceMappingURL=cart.controller.js.map