import { Module } from '@nestjs/common';
import { CheckoutsService } from './checkouts.service';
import { CheckoutsController } from './checkouts.controller';
import { PrismaService } from './../prisma.service';

@Module({
  providers: [PrismaService, CheckoutsService],
  controllers: [CheckoutsController],
})
export class CheckoutsModule {}
