import { Injectable, NotFoundException } from "@nestjs/common";
import { Cart } from "./cart.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "src/products/product.model";
import { Item } from "./cart.model";

// dateCreated: date,
//     items: [{
//         product: { _id: "2", title: "asd", price: 12, category: "bread", imageUrl: "asd" },
//         quantity: 1
//     }

@Injectable()
export class CartService {

    constructor(@InjectModel('Cart') private readonly cartModel: Model<Cart>) { }

    async createEmptyCart() {
        const date = new Date();
        const newCart = new this.cartModel({
            dateCreated: date,
        });
        const result = await newCart.save();
        return result.id as string;
    }

    async addProductToCard(cartId: string, product: Product, change: number) {
        const query = { $and: [{ _id: cartId }, { 'items.quantity': { $exists: true } }, { 'items.product.id': product.id }] };

        let cart = await this.cartModel.findOne(query);
        if (!cart) {
            cart = (await this.cartModel.findOne({ _id: cartId }));
           this.addNotExistItem(cart, cartId, product);
        } else {           
            this.addItemOrDeleteFromCart(cart, product, change);
        }

        cart.save();
        return cart;
    }

    // Increase or decrease cart product if product is 0 delete the item from the list
    async addItemOrDeleteFromCart(cart: Cart, product: Product, change:number ) {
       cart.items = cart.items.filter(p => {
            if (p.product.id === product.id) {
                p.quantity = p.quantity + change;
            }
            return p.quantity !== 0;
        });
    }

    async addNotExistItem(cart, cartId, product) {
        cart.items.push({ quantity: 1, product: product });
    }

    async getCartById(cartId: string) {
        return (await this.cartModel.findOne({ _id: cartId }))
    }

    async deleteAllProductFromCart(cartId: string) {
        const cart = await (await this.getCartById(cartId));
        cart.items = [];
        cart.save();
        return cart;
    }

    // { { id: "123", title: "asd", price: 12, category: "bread", imageUrl: "asd" }, 3 }

    // items: [{
    //     product: {
    //         id: { type: String },
    //         title: { type: String },
    //         price: { type: Number },
    //         category: { type: String },
    //         imageUrl: { type: String },
    //     }, quantity: Number
    // }]

    // async getProducts() {
    //     // Map the array since the object inside the array are reference Obj
    //     const products = await this.productModel.find().exec();
    //     return products.map((prod) => ({
    //         id: prod.id,
    //         title: prod.title,
    //         price: prod.price,
    //         category: prod.category,
    //         imageUrl: prod.imageUrl
    //     }));
    // }

    // async getSingleProduct(id: string) {
    //     const product = await this.findProduct(id);
    //     return {
    //         id: product.id,
    //         title: product.title,
    //         price: product.price,
    //         category: product.category,
    //         imageUrl: product.imageUrl
    //     };
    // }

    // async updateProduct(id: string, title: string, price: number, category: string, imageUrl: string) {
    //     const updateProduct = await this.findProduct(id);

    //     if (title) { updateProduct.title = title; }
    //     if (price) { updateProduct.price = price; }
    //     if (category) { updateProduct.category = category; }
    //     if (imageUrl) { updateProduct.imageUrl = imageUrl; }

    //     updateProduct.save();
    // }

    // async deleteProduct(id: string) {
    //     const result = await this.productModel.deleteOne({ _id: id }).exec();
    //     if (result.n === 0) {
    //         throw new NotFoundException('Could not find product');
    //     }
    // }

    // async findProduct(id: string): Promise<Product> {
    //     let product;
    //     try {
    //         product = await this.productModel.findById(id);
    //     } catch (error) {
    //         throw new NotFoundException('Could not find product');
    //     }
    //     if (!product) {
    //         throw new NotFoundException('Could not find product');
    //     }
    //     return product;
    // }
}