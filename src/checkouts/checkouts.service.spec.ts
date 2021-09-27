import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutsController } from './checkouts.controller';
import { CheckoutsService } from './checkouts.service';
import { AppService } from './../app.service';
import { CheckoutDTO } from './../dto/checkout';

describe('CheckoutsController', () => {
  let controller: CheckoutsController;

  const mockProductService = {
    create: jest.fn((data: CheckoutDTO) => {
      return {
        id: Date.now(),
        ...data,
      };
    }),
    update: jest.fn((data: CheckoutDTO) => {
      return {
        id: Date.now(),
        ...data,
      };
    }),
    getAll: jest.fn(() => []),
    verifyIfExists: jest.fn(() => false),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CheckoutsController],
      providers: [AppService, CheckoutsService],
    })
      .overrideProvider(CheckoutsService)
      .useValue(mockProductService)
      .compile();

    controller = app.get<CheckoutsController>(CheckoutsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get checkout', async () => {
    const responseCheckout = await controller.getAll();

    expect(responseCheckout).toEqual([]);
    expect(mockProductService.getAll).toHaveBeenCalled();
  });

  it('should create a checkout', async () => {
    const checkoutDTO: CheckoutDTO = {
      idProduct: 1,
      quantity: 10,
    };
    const checkoutResponse = {
      product: { connect: { id: checkoutDTO.idProduct } },
      quantity: checkoutDTO.quantity,
    };

    const checkout = await controller.create(checkoutDTO);

    expect(checkout).toEqual({
      id: expect.any(Number),
      ...checkoutResponse,
    });

    expect(mockProductService.create).toHaveBeenCalledWith(checkoutResponse);
  });
  it('should update a checkout', async () => {
    const checkoutDTO: CheckoutDTO = {
      idProduct: 1,
      quantity: 10,
    };
    const checkoutResponse = {
      product: { connect: { id: checkoutDTO.idProduct } },
      quantity: checkoutDTO.quantity,
    };

    const checkout = await controller.update(checkoutDTO);

    expect(checkout).toEqual({
      id: expect.any(Number),
      ...checkoutResponse,
    });

    expect(mockProductService.create).toHaveBeenCalledWith(checkoutResponse);
  });
});
