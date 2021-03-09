import { Controller, Post, Body, Get, Param, Patch, Delete, UsePipes, Header, UseGuards, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ProductService } from "./products.service";
import { JoiValidationPipe } from "src/pipes/joi-validation.pipe";
import { ProductValidationSchema } from "./product-joi.validation";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator";
import { Product } from "./product.model";
import { FileInterceptor, FilesInterceptor, MulterModule } from '@nestjs/platform-express';
import { diskStorage } from "multer";
import { array } from "@hapi/joi";
import { editFileName, imageFileFilter } from "src/common/file-upload.utils";

@Controller('products')
export class ProductsController {    
    constructor(private readonly productServicer: ProductService) { }

    @Post()
    @UsePipes(new JoiValidationPipe(ProductValidationSchema))
    @UseGuards(new AuthGuard())
    async addProduct(@Body() completeBody: Product) {
        const generatedId = await this.productServicer.insertProduct(completeBody.title, completeBody.price, completeBody.category, completeBody.imageUrl);
        return { id: generatedId };
    }

    @Patch(':id')
    @UseGuards(new AuthGuard())
    async updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('price') prodPrice: number,
        @Body('category') prodCategory: string,
        @Body('imageUrl') prodImageUrl: string,
    ) {
        await this.productServicer.updateProduct(prodId, prodTitle, prodPrice, prodCategory, prodImageUrl);
        return null;
    }
    @Get()
    async getAllProducts(
    ) {
        const products = await this.productServicer.getProducts();
        return products;
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string) {
        return this.productServicer.getSingleProduct(prodId);
    }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    async removeProduct(@Param('id') prodId: string) {
        await this.productServicer.deleteProduct(prodId);
        return null;
    }

    
    // // Form with Files
    // @UseInterceptors( FilesInterceptor('files', 5, {
    //     storage: diskStorage({ 
    //         destination: './public',
    //         filename: editFileName,
    //     }),
    //     fileFilter: imageFileFilter,
    // }) )
    // @Post()
    // @UsePipes(new JoiValidationPipe(ProductValidationSchema))
    // @UseGuards(new AuthGuard())
    // async addProduct(
    //     @Body() completeBody: Product,
    //     @UploadedFiles() files: Express.Multer.File[]
    // ) {
    //     const generatedId = await this.productServicer.insertProduct(completeBody.title, completeBody.price, completeBody.category, /*completeBody.imageUrl,*/ files);
    //     return { id: generatedId };
    // }
    
    // @UseInterceptors( FilesInterceptor('files', 5, { storage: diskStorage({ destination: './public', filename: editFileName, }),
    //                                                 fileFilter: imageFileFilter,}))
    // @Patch(':id')
    // @UseGuards(new AuthGuard())
    // async updateProduct(
    //     @Param('id') prodId: string,
    //     @Body('title') prodTitle: string,
    //     @Body('price') prodPrice: number,
    //     @Body('category') prodCategory: string,
    //     // @Body('imageUrl') prodImageUrl: string,
    //     @UploadedFiles() files: Express.Multer.File[]
    // ) {
    //     await this.productServicer.updateProduct(prodId, prodTitle, prodPrice, prodCategory,/* prodImageUrl,*/ files);
    //     return null;
    // }
    // // End Form with Files

    // // Examples how to upload a file
    // @UseInterceptors( FilesInterceptor('files', 5, { storage: diskStorage({ destination: './public'}) }) )
    // @Post('files')
    // async uploadImages(
    //     @Body() completeBody: Product,
    //     @UploadedFiles() files: Express.Multer.File
    // ) {
    //     console.log(files[0]);
    //     return true;
    // }

    // @UseInterceptors(FileInterceptor('file'))
    // @Post('file')
    // async uploadOneImage(
    //     @UploadedFile() file: Express.Multer.File
    // ) {
    //     console.log(file);
    //     return true;
    // }
}