import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Order } from '@prisma/client';
import { OrdersService } from './orders.service';
import { CheckoutsService } from '../checkouts/checkouts.service';
import Pagination from './../../src/helpers/pagination';
import { PaginationDTO } from './../dto/pagination';
import { OrderDTO } from './../dto/order';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly checkoutService: CheckoutsService,
  ) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiTags('orders')
  @ApiOperation({ summary: 'Get orders' })
  @ApiResponse({ status: 200, description: 'Search succesfully' })
  async getAll(@Query() paginationDTO: PaginationDTO): Promise<Pagination> {
    return this.ordersService.getAllByUser(paginationDTO);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiTags('orders')
  @ApiOperation({ summary: 'Create order' })
  @ApiResponse({
    status: 400,
    description: 'This sku was registered previously!',
  })
  @ApiResponse({ status: 200, description: 'Search succesfully!' })
  async create(@Body() orderDTO: OrderDTO): Promise<Order> {
    const checkoutHasItems = await this.checkoutService.getAllByUser({});

    if (checkoutHasItems.length === 0) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'The checkout is empty!',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.ordersService.create(orderDTO);
  }
}
