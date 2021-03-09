import { BillingPayer, Order } from './order.model';
import { ProductService } from 'src/products/products.service';
export declare class PaypalPaymentService {
    private readonly productService;
    private orderId;
    constructor(productService: ProductService);
    captureOrder(orderID: any): Promise<BillingPayer>;
    paypalCheckOut(completeBody: Order): Promise<{
        intent: string;
        application_context: {
            return_url: string;
            cancel_url: string;
            brand_name: string;
            locale: string;
            landing_page: string;
            shipping_preference: string;
            user_action: string;
        };
        purchase_units: any[];
    }>;
    buildRequestBody(completeBody: Order): Promise<{
        intent: string;
        application_context: {
            return_url: string;
            cancel_url: string;
            brand_name: string;
            locale: string;
            landing_page: string;
            shipping_preference: string;
            user_action: string;
        };
        purchase_units: any[];
    }>;
    private getPurchaseUnitObj;
    private getItemsList;
    private getAmountObj;
    private getShippingObj;
}
