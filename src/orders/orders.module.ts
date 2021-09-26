import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from './../prisma.service';
import { CheckoutsService } from '../checkouts/checkouts.service';
@Module({
  providers: [PrismaService, OrdersService, CheckoutsService],
  controllers: [OrdersController]
})
export class OrdersModule {}
