import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { AppService } from './../app.service';
import { ProductDTO } from './../dto/product';

describe('ProductsController', () => {
  let controller: ProductsController;

  const mockProductService = {
    create: jest.fn((productDTO: ProductDTO) => {
      return {
        id: Date.now(),
        ...productDTO,
      };
    }),
    verifyIfExists: jest.fn(() => false),
    getAll: jest.fn((paginationDTO) => {
      return {
        page: paginationDTO.page,
        nextPage: paginationDTO.page + 1,
        total: 1,
        perPage: paginationDTO.perPage,
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
    const productDTO: ProductDTO = {
      name: 'Cerveza',
      sku: 'CE-37383',
      description: 'Cerveza 250 ml',
      price: 20,
    };

    expect(await controller.create(productDTO)).toEqual({
      id: expect.any(Number),
      ...productDTO,
    });

    expect(mockProductService.create).toHaveBeenCalledWith(productDTO);
  });

  it('should get all products', async () => {
    const paginationDTO = {
      search: '',
      page: 1,
      perPage: 2,
      min: 0,
      max: 0,
    };
    expect(await controller.getAll(paginationDTO)).toEqual({
      page: paginationDTO.page,
      nextPage: paginationDTO.page + 1,
      total: 1,
      perPage: paginationDTO.perPage,
      data: [],
    });

    expect(mockProductService.getAll).toHaveBeenCalled();
  });
});
