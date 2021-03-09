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
const order_service_1 = require("./order.service");
const auth_guard_1 = require("../guards/auth.guard");
const user_decorator_1 = require("../decorators/user.decorator");
const products_service_1 = require("../products/products.service");
const paypal_payment_service_1 = require("./paypal-payment.service");
let OrderController = class OrderController {
    constructor(orderService, productService, paypalService) {
        this.orderService = orderService;
        this.productService = productService;
        this.paypalService = paypalService;
    }
    async addOrder(completeBody) {
        const billingPayer = await this.paypalService.captureOrder(completeBody.paypalOrderID);
        if (billingPayer) {
            const generatedId = await this.orderService.insertOrder(completeBody.userId, completeBody.paypalOrderID, billingPayer, completeBody.shipping, completeBody.datePlaced, completeBody.items);
            return { orderPaidID: generatedId };
        }
        else {
            throw new common_1.BadRequestException('There is something wrong with this order');
        }
    }
    async getPaypalOrder(completeBody) {
        const resp = await this.paypalService.paypalCheckOut(completeBody);
        return resp;
    }
    async executeOrder(orderId) {
        console.log(orderId);
        this.paypalService.captureOrder(orderId);
    }
    async getMyOders(user) {
        const myOders = await this.orderService.getMyOrders(user.id);
        return myOders;
    }
    async getAllOrders() {
        const myOders = await this.orderService.getAllOrders();
        return myOders;
    }
    async getOrderById(orderId) {
        const orderDetails = await this.orderService.getOrderById(orderId);
        return orderDetails;
    }
};
__decorate([
    common_1.Post(),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "addOrder", null);
__decorate([
    common_1.Post('paypal-order'),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getPaypalOrder", null);
__decorate([
    common_1.Get('execute-order/:orderId'),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, common_1.Param('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "executeOrder", null);
__decorate([
    common_1.Get('by-user'),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getMyOders", null);
__decorate([
    common_1.Get(),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAllOrders", null);
__decorate([
    common_1.Get('/by-order-id/:orderId'),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, common_1.Param('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderById", null);
OrderController = __decorate([
    common_1.Controller('orders'),
    __metadata("design:paramtypes", [order_service_1.OrderService,
        products_service_1.ProductService,
        paypal_payment_service_1.PaypalPaymentService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map