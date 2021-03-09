"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const product_module_1 = require("./products/product.module");
const cart_module_1 = require("./shopping-carts/cart.module");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("./auth/auth.module");
const dotenv = require("dotenv");
const category_module_1 = require("./categories/category.module");
const order_module_1 = require("./orders/order.module");
const paypal_payment_service_1 = require("./orders/paypal-payment.service");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
dotenv.config();
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            product_module_1.ProductModule,
            category_module_1.CategoryModule,
            cart_module_1.CartModule,
            order_module_1.OrderModule,
            auth_module_1.AuthModule,
            common_1.HttpModule,
            mongoose_1.MongooseModule.forRoot(process.env.DB_CONNECT),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path_1.join(__dirname, '..', 'public'),
            })
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, paypal_payment_service_1.PaypalPaymentService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map