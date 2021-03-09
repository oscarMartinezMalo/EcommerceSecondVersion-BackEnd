import { PaypalPaymentService } from 'src/orders/paypal-payment/paypal-payment.service';
export declare class PaypalController {
    private paypalService;
    constructor(paypalService: PaypalPaymentService);
    CLIENT: string;
    SECRET: string;
    PAYPAL_API: string;
    getMyOders(req: any): Promise<void>;
}
