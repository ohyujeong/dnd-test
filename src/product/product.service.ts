import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/product.dto';
import { Product } from './product.model';

@Injectable()
export class ProductService {
    private products: Product[] = [];

    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<Product>
    ){}

    async insertProduct(createProductDto: CreateProductDto):Promise<Product> {
        const newProduct = await new this.productModel(createProductDto);
        return newProduct.save();
    }

//     async getProducts() {
//         const products = await this.productModel.find().exec();
//         return products.map(prod => ({
//             id: prod.id,
//             title: prod.title,
//             description: prod.description,
//             price: prod.price,
//         }));
//     }

//     async getSingleProduct(productId: string) {
//         // const product = await this.productModel.findById(productId);
//         const product = await this.findProduct(productId);
//         return {
//             id: product.id,
//             title: product.title,
//             description: product.description,
//             price: product.price,
//         };
//     }

//     private async findProduct(id: string): Promise<Product> {
//         let product;
//         try {
//           product = await this.productModel.findById(id).exec();
//         } catch (error) {
//           throw new NotFoundException('Could not find product.');
//         }
//         if (!product) {
//           throw new NotFoundException('Could not find product.');
//         }
//         return product;
//       }
}