import { Controller, Get, Post, Body, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { Order } from '@prisma/client';
import { OrdersService } from './orders.service';
import Pagination from './../../src/helpers/pagination';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Get()
    async getAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
        @Query('perPage', new DefaultValuePipe(10), ParseIntPipe) perPage?: number,
    ): Promise<Pagination> {
        const userId = 1;
        return this.ordersService.getAllByUser(1, page, perPage);
    }

    @Post()
    async create(
        @Body('addressDelivery') addressDelivery: string,
        @Body('paymentMethod') paymentMethod: string,
    ): Promise<Order> {
        const userId = 1;
        return this.ordersService.create(
            userId,
            addressDelivery,
            paymentMethod
        );
    }
}
