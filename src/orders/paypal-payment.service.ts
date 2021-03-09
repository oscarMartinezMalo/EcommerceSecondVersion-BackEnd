/* eslint-disable @typescript-eslint/camelcase */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as checkoutNodeJssdk from "@paypal/checkout-server-sdk";
import { BillingPayer, Order } from './order.model';
import { ProductService } from 'src/products/products.service';
import * as payPalClient  from '../common/payPalClient ';
import { OrderService } from './order.service';

@Injectable()
export class PaypalPaymentService {
    private orderId: string;

    constructor(
        private readonly productService: ProductService
        // private readonly httpService: HttpService
        ) { }

    // Process the order having the order ID
    async captureOrder(orderID): Promise<BillingPayer> {
        const client = new checkoutNodeJssdk.core.PayPalHttpClient(payPalClient.client());
        const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderID);

        try {
            const capture = await client.execute(request);

            if (capture.statusCode !== 201) { throw new InternalServerErrorException('Something went wrong capturing the Order');}

            let payerInfo = {} as BillingPayer; 
            payerInfo.paypalId = capture.result.purchase_units[0].payments.captures[0].id;
            payerInfo.firtName = capture.result.payer.name.given_name;
            payerInfo.lastName = capture.result.payer.name.surname;
            payerInfo.email= capture.result.payer.email_address;
            return payerInfo;

          } catch (err) {        
            throw new InternalServerErrorException('Something went wrong capturing the Order');           
          }
    }

    async paypalCheckOut(completeBody: Order) {      
        return await this.buildRequestBody(completeBody);
    }

    async buildRequestBody(completeBody: Order) {
        // This seccion is to process the order in the backend
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
       //// End This seccion is to process the order in the backend

        paypalObj.purchase_units[0] = this.getPurchaseUnitObj();
        const objTest = await this.getItemsList(completeBody);
        paypalObj.purchase_units[0].items = objTest.itemList;
        paypalObj.purchase_units[0].amount = this.getAmountObj(objTest.itemsTotalTax, objTest.itemsTotalPrice);
        paypalObj.purchase_units[0].shipping = this.getShippingObj(completeBody);

        return paypalObj;
    }

    private getPurchaseUnitObj() {
        return {
            "reference_id": "PUHF",
            "description": "Sporting Goods",

            "custom_id": "CUST-HighFashions",
            "soft_descriptor": "HighFashions",
            "amount": {},
            "items": [],
            "shipping": {}
        }
    }

    private async getItemsList(completeBody: Order): Promise<{ itemList: any[], itemsTotalTax: number, itemsTotalPrice: number }> {
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
        };
        return { "itemList": itemList, "itemsTotalTax": itemsTotalTax, "itemsTotalPrice": itemsTotalPrice }
        // return itemList;
    }

    private getAmountObj(itemsTotalTax: number, itemsTotalPrice: number) {
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
        }
    }

    private getShippingObj(completeBody: Order) {
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
                "country_code": completeBody.shipping.country  // Validate to be a code sample 
            }
        }
    }
}
