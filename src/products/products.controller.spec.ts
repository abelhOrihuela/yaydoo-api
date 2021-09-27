import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { AppService } from './../app.service';
import Pagination from './../../src/helpers/pagination';
import {PaginationDTO} from './../dto/pagination'
describe('ProductsController', () => {
  let controller: ProductsController;

  const mockProductService = {
    create: jest.fn((product) => {
      return {
        id: Date.now(),
        ...product,
      };
    }),
    verifyIfExists: jest.fn(() => false),
    getAll: jest.fn((paginationDTO: PaginationDTO) => {
      return {
        page: 1,
        nextPage: 1,
        total: 1,
        perPage: 10,
        data: [],
      };
    }),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [AppService, ProductsService],
    })
      .overrideProvider(ProductsService)
      .useValue(mockProductService)
      .compile();

    controller = app.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a product', async () => {
    const productMock = {
      name: 'Cerveza',
      sku: 'CE-37383',
      description: 'Cerveza 250 ml',
      price: 20,
    };

    expect(
      await controller.create(productMock),
    ).toEqual({
      id: expect.any(Number),
      ...productMock,
    });

    expect(mockProductService.create).toHaveBeenCalledWith(productMock);
  });

  it('should get all products', async () => {
    const paginationDTO: PaginationDTO = {
      search: '',
      page: 1,
      perPage: 2,
      min: 0,
      max: 0
    }
    expect(await controller.getAll(paginationDTO)).toEqual({
      page: 1,
      nextPage: 1,
      total: 1,
      perPage: 10,
      data: [],
    });

    expect(mockProductService.getAll).toHaveBeenCalled();
  });
});
