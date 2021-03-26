import { Controller, Post, Body, Get, Param, UseGuards, BadRequestException } from "@nestjs/common";
import { OrderService } from "./order.service";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator";
import { Order } from "./order.model";
import { ProductService } from "src/products/products.service";
import { PaypalPaymentService } from "./paypal-payment.service";

@Controller('orders')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
        private readonly productService: ProductService,
        private paypalService: PaypalPaymentService) { }

    @Post()
    @UseGuards(AuthGuard)
    async addOrder(
        @Body() completeBody: Order
    ) {  
        // Capture the Order and get the Payer Information
        const billingPayer = await this.paypalService.captureOrder(completeBody.paypalOrderID); 

        if( billingPayer ) {
            // Save the Order in the DataBase
            const generatedId = await this.orderService.insertOrder(completeBody.userId, completeBody.paypalOrderID, billingPayer, 
                                                                    completeBody.shipping, completeBody.datePlaced, completeBody.items);
            return { orderPaidID: generatedId };
        } else {
            throw new BadRequestException('There is something wrong with this order');
        }
    }

    @Post('paypal-order')
    @UseGuards(AuthGuard)
    async getPaypalOrder(
        @Body() completeBody: Order
    ) {
        const resp = await this.paypalService.paypalCheckOut(completeBody);
        return resp;
    }

    @Get('execute-order/:orderId')
    @UseGuards(AuthGuard)
    async executeOrder(@Param('orderId') orderId: string) {
        console.log(orderId);
        this.paypalService.captureOrder(orderId);
    }

    @Get('by-user')
    @UseGuards(AuthGuard)
    async getMyOders(@User() user: { id: string, email: string }){      // @Param('userId') userId: string,) {
        const myOders = await this.orderService.getMyOrders(user.id);
        return myOders;
    }

    @Get()
    @UseGuards(AuthGuard)
    async getAllOrders() {
        const myOders = await this.orderService.getAllOrders();
        return myOders;
    }

    @Get('/by-order-id/:orderId')
    @UseGuards(AuthGuard)
    async getOrderById(@Param('orderId') orderId: string) {
        const orderDetails = await this.orderService.getOrderById(orderId);
        return orderDetails;
    }
}