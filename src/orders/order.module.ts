import { Module, NestModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { OrderSchema } from "./order.model";
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { ProductModule } from "src/products/product.module";

// import { AuthMiddleware } from "src/middlewares/auth.middleware";
import { PaypalPaymentService } from './paypal-payment.service';
import { UserSchema } from "src/auth/user.model";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }, { name: 'User', schema: UserSchema }]),
        ProductModule],
    controllers: [OrderController],
    providers: [OrderService, PaypalPaymentService],
})
export class OrderModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // throw new Error("Method not implemented.");
    }
}
