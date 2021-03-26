import { Module, NestModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductService } from "./products.service";
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from "./product.model";
import { UserSchema } from "src/auth/user.model";
// import { AuthMiddleware } from "src/middlewares/auth.middleware";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }, { name: 'User', schema: UserSchema }])],
    controllers:[ProductsController],
    providers:[ProductService],
    exports:[ProductService]
})
export class ProductModule implements NestModule{
    // Apply Middleware to a route
    configure(consumer: MiddlewareConsumer) {
        // Target all subroutes of products
        // consumer.apply(AuthMiddleware).forRoutes({ path: 'products/*', method: RequestMethod.GET });
        // consumer.apply(AuthMiddleware).forRoutes({path: 'products', method: RequestMethod.ALL});
    }
}