import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import Pagination from './../../src/helpers/pagination';
import { ProductDTO } from './../dto/product';
import { PaginationDTO } from './../dto/pagination';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiProperty,
} from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiTags('products')
  @ApiOperation({ summary: 'Get products' })
  @ApiResponse({ status: 200, description: 'Search succesfully' })
  async getAll(@Query() paginationDTO: PaginationDTO): Promise<Pagination> {
    return this.productService.getAll(paginationDTO);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiTags('products')
  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({
    status: 400,
    description: 'This sku was registered previously!',
  })
  @ApiResponse({ status: 200, description: 'Search succesfully!' })
  @ApiProperty({ type: ProductDTO })
  async create(@Body() productDTO: ProductDTO) {
    const verifyIfExists = await this.productService.verifyIfExists(productDTO);

    if (verifyIfExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'This sku was registered previously!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.productService.create(productDTO);
  }
}
