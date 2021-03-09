import { Controller, Post, Body, Get, Param, Patch, Delete, UsePipes } from "@nestjs/common";
import { CartService } from "./cart.service";
import { Product } from "src/products/product.model";

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get('create')
    async addCart() {
        const cartId = await this.cartService.createEmptyCart();
        return { id: cartId };
    }

    @Get(':id')
    async getCart(@Param('id') cartId: string) {
        const cart = await this.cartService.getCartById(cartId);
        return cart;
    }

    @Post('update-item-quantity')
    async getItemToCard(
        @Body('cartId') cartId: string,
        @Body('product') product: Product,
        @Body('change') change: number,
    ) {
        const cart = await this.cartService.addProductToCard(cartId, product, change);
        return cart;
    }

    @Delete(':id')
    async removeProduct(@Param('id') cartId: string) {
        const cart = await this.cartService.deleteAllProductFromCart(cartId);
        return cart;
    }
}