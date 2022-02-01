import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    Res,
} from '@nestjs/common';
import { CreateProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController { 
    constructor(private readonly productService: ProductService){}

    @Post()
    async addProduct(@Res() res, @Body() createProductDto: CreateProductDto){
        const newProduct = await this.productService.insertProduct(createProductDto);
        return res.json({
            message: 'successfully!',
            product: newProduct
        })
    }

    // @Get()
    // async getAllProducts() {
    //   const products = await this.productService.getProducts();
    //   return products;
    // }
  
    // @Get(':id')
    // getProduct(@Param('id') prodId: string) {
    //   return this.productService.getSingleProduct(prodId);
    // }
}
