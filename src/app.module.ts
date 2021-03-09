import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { CartModule } from './shopping-carts/cart.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { CategoryModule } from './categories/category.module';
import { OrderModule } from './orders/order.module';
import { PaypalPaymentService } from './orders/paypal-payment.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
dotenv.config();

@Module({
  imports: [
    ProductModule,
    CategoryModule,
    CartModule,
    OrderModule,
    AuthModule,
    HttpModule,
    MongooseModule.forRoot(      
      process.env.DB_CONNECT  // Enviroment Variable handled through dotenv npm package( file name .env)
    ),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    })],
  controllers: [AppController],
  providers: [AppService, PaypalPaymentService],
})
export class AppModule { }
