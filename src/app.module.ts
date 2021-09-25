import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CheckoutsModule } from './checkouts/checkouts.module';

@Module({
  imports: [ProductsModule, CheckoutsModule],
})
export class AppModule {}
