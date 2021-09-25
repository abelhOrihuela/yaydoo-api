import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { ProductsService } from './products.service';
//import { Product } from '@prisma/client';
import Pagination from './../../src/helpers/pagination';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async getAll(
    @Query('search') search?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('perPage', new DefaultValuePipe(10), ParseIntPipe) perPage?: number,
    @Query('min', new DefaultValuePipe(0), ParseIntPipe) min?: number,
    @Query('max', new DefaultValuePipe(0), ParseIntPipe) max?: number,
  ): Promise<Pagination> {
    return this.productService.getAll(search, page, perPage, min, max);
  }

  @Post()
  async create(
    @Body('name') name: string,
    @Body('sku') sku: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    const verifyIfExists = await this.productService.verifyIfExists({
      sku,
    });

    if (verifyIfExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'This sku was registered previously!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.productService.create({
      name,
      sku,
      description,
      price,
    });
  }
}
