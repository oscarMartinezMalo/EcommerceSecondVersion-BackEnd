import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from "./category.model";
import { UserSchema } from "src/auth/user.model";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'category', schema: CategorySchema },  { name: 'User', schema: UserSchema }])],
    controllers: [CategoryController],
    providers: [CategoryService]
})
export class CategoryModule implements NestModule {
    // Apply Middleware to a route
    configure(consumer: MiddlewareConsumer) {
        // Target all subroutes of products
        // consumer.apply(AuthMiddleware).forRoutes({ path: 'products/*', method: RequestMethod.GET });
        // consumer.apply(AuthMiddleware).forRoutes({path: 'products', method: RequestMethod.ALL});
    }
}