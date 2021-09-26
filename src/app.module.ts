import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CheckoutsModule } from './checkouts/checkouts.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [ProductsModule, CheckoutsModule, OrdersModule],
})
export class AppModule {}
