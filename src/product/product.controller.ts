import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController { 
    constructor(private readonly productService: ProductService){}

    @Post()
    async addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
    ){
        const generatedId = await this.productService.insertProduct(
            prodTitle,
            prodDesc,
            prodPrice,
        );
        return {id: generatedId};
    }

    @Get()
    async getAllProducts() {
      const products = await this.productService.getProducts();
      return products;
    }
  
    @Get(':id')
    getProduct(@Param('id') prodId: string) {
      return this.productService.getSingleProduct(prodId);
    }
}
