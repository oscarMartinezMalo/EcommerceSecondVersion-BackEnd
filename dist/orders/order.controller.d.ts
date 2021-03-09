import { OrderService } from "./order.service";
import { Order } from "./order.model";
import { ProductService } from "src/products/products.service";
import { PaypalPaymentService } from "./paypal-payment.service";
export declare class OrderController {
    private readonly orderService;
    private readonly productService;
    private paypalService;
    constructor(orderService: OrderService, productService: ProductService, paypalService: PaypalPaymentService);
    addOrder(completeBody: Order): Promise<{
        orderPaidID: string;
    }>;
    getPaypalOrder(completeBody: Order): Promise<{
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
    executeOrder(orderId: string): Promise<void>;
    getMyOders(user: {
        id: string;
        email: string;
    }): Promise<Order[]>;
    getAllOrders(): Promise<Order[]>;
    getOrderById(orderId: string): Promise<Order>;
}
