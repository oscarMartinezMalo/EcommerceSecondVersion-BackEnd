"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const order_model_1 = require("./order.model");
const mongoose_1 = require("@nestjs/mongoose");
const order_controller_1 = require("./order.controller");
const order_service_1 = require("./order.service");
const product_module_1 = require("../products/product.module");
const paypal_payment_service_1 = require("./paypal-payment.service");
const user_model_1 = require("../auth/user.model");
let OrderModule = class OrderModule {
    configure(consumer) {
    }
};
OrderModule = __decorate([
    common_1.Module({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'Order', schema: order_model_1.OrderSchema }, { name: 'User', schema: user_model_1.UserSchema }]),
            product_module_1.ProductModule],
        controllers: [order_controller_1.OrderController],
        providers: [order_service_1.OrderService, paypal_payment_service_1.PaypalPaymentService],
    })
], OrderModule);
exports.OrderModule = OrderModule;
//# sourceMappingURL=order.module.js.map