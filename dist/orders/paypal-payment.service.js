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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const checkoutNodeJssdk = require("@paypal/checkout-server-sdk");
const products_service_1 = require("../products/products.service");
const payPalClient = require("../common/payPalClient ");
let PaypalPaymentService = class PaypalPaymentService {
    constructor(productService) {
        this.productService = productService;
    }
    async captureOrder(orderID) {
        const client = new checkoutNodeJssdk.core.PayPalHttpClient(payPalClient.client());
        const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderID);
        try {
            const capture = await client.execute(request);
            if (capture.statusCode !== 201) {
                throw new common_1.InternalServerErrorException('Something went wrong capturing the Order');
            }
            let payerInfo = {};
            payerInfo.paypalId = capture.result.purchase_units[0].payments.captures[0].id;
            payerInfo.firtName = capture.result.payer.name.given_name;
            payerInfo.lastName = capture.result.payer.name.surname;
            payerInfo.email = capture.result.payer.email_address;
            return payerInfo;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('Something went wrong capturing the Order');
        }
    }
    async paypalCheckOut(completeBody) {
        return await this.buildRequestBody(completeBody);
    }
    async buildRequestBody(completeBody) {
        const paypalObj = {
            "intent": "CAPTURE",
            "application_context": {
                "return_url": "http://localhost:4200/order-receipt",
                "cancel_url": "https://www.example.com",
                "brand_name": "EXAMPLE INC",
                "locale": "en-US",
                "landing_page": "BILLING",
                "shipping_preference": "SET_PROVIDED_ADDRESS",
                "user_action": "CONTINUE"
            }, "purchase_units": []
        };
        paypalObj.purchase_units[0] = this.getPurchaseUnitObj();
        const objTest = await this.getItemsList(completeBody);
        paypalObj.purchase_units[0].items = objTest.itemList;
        paypalObj.purchase_units[0].amount = this.getAmountObj(objTest.itemsTotalTax, objTest.itemsTotalPrice);
        paypalObj.purchase_units[0].shipping = this.getShippingObj(completeBody);
        return paypalObj;
    }
    getPurchaseUnitObj() {
        return {
            "reference_id": "PUHF",
            "description": "Sporting Goods",
            "custom_id": "CUST-HighFashions",
            "soft_descriptor": "HighFashions",
            "amount": {},
            "items": [],
            "shipping": {}
        };
    }
    async getItemsList(completeBody) {
        const itemList = [];
        let itemsTotalTax = 0;
        let itemsTotalPrice = 0;
        for (const item of completeBody.items) {
            const itemDB = await this.productService.getSingleProduct(item.product.id);
            const itemTax = Math.ceil(itemDB.price * 0.07);
            itemsTotalTax += itemTax;
            itemsTotalPrice += itemDB.price;
            const newItem = {
                "name": itemDB.title,
                "description": itemDB.title,
                "sku": itemDB.id,
                "unit_amount": {
                    "currency_code": "USD",
                    "value": itemDB.price
                },
                "tax": {
                    "currency_code": "USD",
                    "value": itemTax
                },
                "quantity": item.quantity,
                "category": "PHYSICAL_GOODS"
            };
            itemList.push(newItem);
        }
        ;
        return { "itemList": itemList, "itemsTotalTax": itemsTotalTax, "itemsTotalPrice": itemsTotalPrice };
    }
    getAmountObj(itemsTotalTax, itemsTotalPrice) {
        const totalPrice = itemsTotalPrice + 20 + 10 + itemsTotalTax - 10;
        return {
            "currency_code": "USD",
            "value": totalPrice,
            "breakdown": {
                "item_total": {
                    "currency_code": "USD",
                    "value": itemsTotalPrice
                },
                "shipping": {
                    "currency_code": "USD",
                    "value": "20.00"
                },
                "handling": {
                    "currency_code": "USD",
                    "value": "10.00"
                },
                "tax_total": {
                    "currency_code": "USD",
                    "value": itemsTotalTax
                },
                "shipping_discount": {
                    "currency_code": "USD",
                    "value": "10"
                }
            }
        };
    }
    getShippingObj(completeBody) {
        return {
            "method": "United States Postal Service",
            "name": {
                "full_name": completeBody.shipping.name
            },
            "address": {
                "address_line_1": completeBody.shipping.address,
                "address_line_2": completeBody.shipping.apartment,
                "admin_area_2": completeBody.shipping.city,
                "admin_area_1": completeBody.shipping.state,
                "postal_code": completeBody.shipping.zipCode,
                "country_code": completeBody.shipping.country
            }
        };
    }
};
PaypalPaymentService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [products_service_1.ProductService])
], PaypalPaymentService);
exports.PaypalPaymentService = PaypalPaymentService;
//# sourceMappingURL=paypal-payment.service.js.map