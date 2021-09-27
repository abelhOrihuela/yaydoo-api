import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { PrismaService } from '../../src/prisma.service';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, OrdersService],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('OrdersService - should be defined', () => {
    expect(service).toBeDefined();
  });
});
