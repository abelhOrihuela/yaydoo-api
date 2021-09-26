import { Controller, Get, Post, Body, Query, ParseIntPipe, DefaultValuePipe, HttpException, HttpStatus } from '@nestjs/common';
import { Order } from '@prisma/client';
import { OrdersService } from './orders.service';
import { CheckoutsService } from '../checkouts/checkouts.service';
import Pagination from './../../src/helpers/pagination';

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService,
        private readonly checkoutService: CheckoutsService,
        ) { }

    @Get()
    async getAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
        @Query('perPage', new DefaultValuePipe(10), ParseIntPipe) perPage?: number,
    ): Promise<Pagination> {
        return this.ordersService.getAllByUser(page, perPage);
    }

    @Post()
    async create(
        @Body('addressDelivery') addressDelivery: string,
        @Body('paymentMethod') paymentMethod: string,
    ): Promise<Order> {
        const userId = 1;

        const checkoutHasItems = await this.checkoutService.getAllByUser({})

        if (checkoutHasItems.length === 0) {
            throw new HttpException(
                {
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    error: 'The checkout is empty!',
                },
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }

        
        return this.ordersService.create(
            addressDelivery,
            paymentMethod
        );
    }
}
