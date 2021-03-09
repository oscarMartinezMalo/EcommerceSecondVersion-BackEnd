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
const paypal_payment_service_1 = require("../orders/paypal-payment/paypal-payment.service");
let PaypalController = class PaypalController {
    constructor(paypalService) {
        this.paypalService = paypalService;
        this.CLIENT = 'AUJoKVGO3q1WA1tGgAKRdY6qx0qQNIQ6vl6D3k7y64T4qh5WozIQ7V3dl3iusw5BwXYg_T5FzLCRguP8';
        this.SECRET = 'EOw8LNwDhM7esrQ3nHfzKc7xiWnJc83Eawln4YLfUgivfx1LGzu9Mj0F5wlarilXDqdK9Q5aHVo-VGjJ';
        this.PAYPAL_API = 'https://api.sandbox.paypal.com';
    }
    async getMyOders(req) {
        console.log(req);
        const payerID = req.query.PayerID;
        const token = req.query.token;
    }
};
__decorate([
    common_1.Get('success'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaypalController.prototype, "getMyOders", null);
PaypalController = __decorate([
    common_1.Controller('paypal'),
    __metadata("design:paramtypes", [paypal_payment_service_1.PaypalPaymentService])
], PaypalController);
exports.PaypalController = PaypalController;
//# sourceMappingURL=paypal.controller.js.map