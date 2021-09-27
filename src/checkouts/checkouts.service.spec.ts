import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutsService } from './checkouts.service';
import { PrismaService } from '../../src/prisma.service';

describe('CheckoutsService', () => {
  let service: CheckoutsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, CheckoutsService],
      imports: [],
    }).compile();

    service = module.get<CheckoutsService>(CheckoutsService);
  });

  it('CheckoutService - should be defined', () => {
    expect(service).toBeDefined();
  });
});