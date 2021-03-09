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
const product_model_1 = require("../products/product.model");
let CartService = class CartService {
    constructor(cartModel) {
        this.cartModel = cartModel;
    }
    async createEmptyCart() {
        const date = new Date();
        const newCart = new this.cartModel({
            dateCreated: date,
        });
        const result = await newCart.save();
        return result.id;
    }
    async addProductToCard(cartId, product, change) {
        const query = { $and: [{ _id: cartId }, { 'items.quantity': { $exists: true } }, { 'items.product.id': product.id }] };
        let cart = await this.cartModel.findOne(query);
        if (!cart) {
            cart = (await this.cartModel.findOne({ _id: cartId }));
            this.addNotExistItem(cart, cartId, product);
        }
        else {
            this.addItemOrDeleteFromCart(cart, product, change);
        }
        cart.save();
        return cart;
    }
    async addItemOrDeleteFromCart(cart, product, change) {
        cart.items = cart.items.filter(p => {
            if (p.product.id === product.id) {
                p.quantity = p.quantity + change;
            }
            return p.quantity !== 0;
        });
    }
    async addNotExistItem(cart, cartId, product) {
        cart.items.push({ quantity: 1, product: product });
    }
    async getCartById(cartId) {
        return (await this.cartModel.findOne({ _id: cartId }));
    }
    async deleteAllProductFromCart(cartId) {
        const cart = await (await this.getCartById(cartId));
        cart.items = [];
        cart.save();
        return cart;
    }
};
CartService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Cart')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CartService);
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map