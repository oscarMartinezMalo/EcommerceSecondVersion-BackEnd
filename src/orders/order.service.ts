import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BillingPayer, Order, Shipping } from "./order.model";

@Injectable()
export class OrderService {
    constructor(@InjectModel('Order') private readonly orderModel: Model<Order>) { }

    async insertOrder(userId: string, paypalOrderID: string, billingPayer: BillingPayer, shipping: Shipping, datePlaced: string, items: any) {
        const newOrder = new this.orderModel({ userId, paypalOrderID, billingPayer, shipping, datePlaced, items});
       const result = await newOrder.save();
       return result.id as string;
    }

    async getMyOrders( userId: string) {
        const result = await this.orderModel.find({userId: userId}).exec();
        return result;
    }

    async getAllOrders() {
        const result = await this.orderModel.find().exec();
        return result;
    }

    async getOrderById( orderId: string) {
        const result = await this.orderModel.findOne({ _id: orderId }).exec();
        return result;
    }
}