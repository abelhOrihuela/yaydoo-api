import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaService } from './../prisma.service';

@Module({
  controllers: [ProductsController],
  providers: [PrismaService, ProductsService],
})
export class ProductsModule {}
