import { Model } from "mongoose";
import { BillingPayer, Order, Shipping } from "./order.model";
export declare class OrderService {
    private readonly orderModel;
    constructor(orderModel: Model<Order>);
    insertOrder(userId: string, paypalOrderID: string, billingPayer: BillingPayer, shipping: Shipping, datePlaced: string, items: any): Promise<string>;
    getMyOrders(userId: string): Promise<Order[]>;
    getAllOrders(): Promise<Order[]>;
    getOrderById(orderId: string): Promise<Order>;
}
