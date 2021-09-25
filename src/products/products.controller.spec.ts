import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { AppService } from './../app.service';
import Pagination from './../../src/helpers/pagination';

describe('ProductsController', () => {
  let controller: ProductsController;

  const mockProductService = {
    create: jest.fn((product) => {
      return {
        id: Date.now(),
        ...product
      }

    }),
    verifyIfExists: jest.fn(() => false),
    getAll: jest.fn(() => {
      return {
        page: 1,
        nextPage: 1,
        total: 1,
        perPage: 10,
        data: [],
      }
    })
  }

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

  it("should be defined",  () => {
    expect(controller).toBeDefined()
  })

  it("should create a product",  async () => {

    const productMock = {
      name: "Cerveza",
      sku: "CE-37383",
      description: "Cerveza 250 ml",
      price: 20
    }
    
    expect(await controller.create("Cerveza", "CE-37383", "Cerveza 250 ml", 20)).toEqual({
      id: expect.any(Number),
      ...productMock
    })

    expect(mockProductService.create).toHaveBeenCalledWith(productMock)
  })

  it("should get all products",  async () => {

    expect(await controller.getAll()).toEqual({
      page: 1,
      nextPage: 1,
      total: 1,
      perPage: 10,
      data: [],
    });

    expect(mockProductService.getAll).toHaveBeenCalled()
  })
});
