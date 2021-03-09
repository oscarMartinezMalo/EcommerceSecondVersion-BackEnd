import { Module, NestModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";
import { CartSchema } from "./cart.model";
import { MongooseModule } from '@nestjs/mongoose';
// import { AuthMiddleware } from "src/middlewares/auth.middleware";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Cart', schema: CartSchema }])],
    controllers: [CartController],
    providers: [CartService],
})
export class CartModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // throw new Error("Method not implemented.");
    }
}
