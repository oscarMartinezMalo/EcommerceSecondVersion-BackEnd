"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const cart_controller_1 = require("./cart.controller");
const cart_service_1 = require("./cart.service");
const cart_model_1 = require("./cart.model");
const mongoose_1 = require("@nestjs/mongoose");
let CartModule = class CartModule {
    configure(consumer) {
    }
};
CartModule = __decorate([
    common_1.Module({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'Cart', schema: cart_model_1.CartSchema }])],
        controllers: [cart_controller_1.CartController],
        providers: [cart_service_1.CartService],
    })
], CartModule);
exports.CartModule = CartModule;
//# sourceMappingURL=cart.module.js.map