import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from '../../src/prisma.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, ProductsService],
      imports: [],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('ProductsService - should be defined', () => {
    expect(service).toBeDefined();
  });
});