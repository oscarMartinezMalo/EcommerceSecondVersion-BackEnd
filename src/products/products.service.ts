import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as fs from 'fs';

@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    async insertProduct(title: string, price: number, category: string, imageUrl: string, files:  Express.Multer.File[]) {
        if(files.length <= 0 ) throw new BadRequestException('At least one Image is Required');
        
        const imagesUrls = files.map(x => { return process.env.LOCAL_URL + x.filename; } );  // Convert array of files to array of string path

        const newProduct = new this.productModel({ title, price, category, imageUrl, imagesUrls });
        const result = await newProduct.save();
        return result.id as string;
    }

    async getProducts() {
        // Map the array since the object inside the array are reference Obj
        const products = await this.productModel.find().exec();
        return products.map((prod) => ({
            id: prod.id,
            title: prod.title,
            price: prod.price,
            category: prod.category,
            imageUrl: prod.imageUrl,
            imagesUrls: prod.imagesUrls,
        }));
    }

    async getSingleProduct(id: string) {
        const product = await this.findProduct(id);
        return {
            id: product.id,
            title: product.title,
            price: product.price,
            category: product.category,
            imageUrl: product.imageUrl,
            imagesUrls: product.imagesUrls,
        };
    }

    async updateProduct(id: string, title: string, price: number, category: string, imageUrl: string, imagesUrls: string[]=[],  files:Express.Multer.File[]) {
        const updateProduct = await this.findProduct(id);

        // Concat previous Urls with current list of files Urls
        const imagesUploadedUrl = files.map(x => { return process.env.LOCAL_URL + x.filename; } );        
        const CompleteImagesUrls = imagesUploadedUrl.concat(imagesUrls);

        // Get the Files url that were deleted
        const filesToDelete = updateProduct.imagesUrls.filter(x => !!!CompleteImagesUrls.find(ci => ci === x));      

        if (title) { updateProduct.title = title; }
        if (price) { updateProduct.price = price; }
        if (category) { updateProduct.category = category; }
        if (imageUrl) { updateProduct.imageUrl = imageUrl; }
        if( imagesUrls ) { updateProduct.imagesUrls = CompleteImagesUrls }
        updateProduct.save();        

        this.deleteFilesFromDirectory(filesToDelete);
    }

    // Delete the phisycal files that there are not in imagesUrls but they exist in the database
    deleteFilesFromDirectory(filesToDelete: string[]){
        filesToDelete.forEach(fl => {
            const fileAddress = fl.split('/');
            const filePath = fileAddress[fileAddress.length - 1];
            fs.unlink("public/" + filePath, (err) => {
                if (err) console.log("failed to delete local image:" + err);
                else console.log('successfully deleted local image');
            })
        })
    }

    async deleteProduct(id: string) {
        // First get the files from Public directory to delete them after the record was erase
        const updateProduct = await this.findProduct(id);

        // Delete the complete record from the dataBase
        const result = await this.productModel.deleteOne({ _id: id }).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find product');
        }else{
            this.deleteFilesFromDirectory(updateProduct.imagesUrls);
        }
    }

    async findProduct(id: string): Promise<Product> {
        let product;
        try {
            product = await this.productModel.findById(id);
        } catch (error) {
            throw new NotFoundException('Could not find product');
        }
        if (!product) {
            throw new NotFoundException('Could not find product');
        }
        return product;
    }
}