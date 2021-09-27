import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutsController } from './checkouts.controller';
import { CheckoutsService } from './checkouts.service';
import { AppService } from './../app.service';
import { CheckoutDTO } from './../dto/checkout';

describe('CheckoutsController', () => {
  let controller: CheckoutsController;

  const mockCheckoutService = {
    create: jest.fn((checkoutDTO: CheckoutDTO) => {
      return {
        id: Date.now(),
        ...checkoutDTO,
      };
    }),
    update: jest.fn((data: CheckoutDTO) => {
      return {
        id: Date.now(),
        ...data,
      };
    }),
    getAll: jest.fn(() => []),
    delete: jest.fn((id) => {
      return {
        id,
        idProduct: Date.now(),
        quantity: Date.now(),
      };
    }),
    verifyIfExists: jest.fn(() => false),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CheckoutsController],
      providers: [AppService, CheckoutsService],
    })
      .overrideProvider(CheckoutsService)
      .useValue(mockCheckoutService)
      .compile();

    controller = app.get<CheckoutsController>(CheckoutsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get checkout', async () => {
    const responseCheckout = await controller.getAll();
    expect(responseCheckout).toEqual([]);
    expect(mockCheckoutService.getAll).toHaveBeenCalled();
  });

  it('should create a checkout', async () => {
    const checkoutDTO: CheckoutDTO = {
      idProduct: 1,
      quantity: 10,
    };
    const checkoutInput = {
      product: { connect: { id: checkoutDTO.idProduct } },
      quantity: checkoutDTO.quantity,
    };

    const checkout = await controller.create(checkoutDTO);

    expect(checkout).toEqual({
      id: expect.any(Number),
      ...checkoutInput,
    });

    expect(mockCheckoutService.create).toHaveBeenCalledWith(checkoutInput);
  });
  it('should update a checkout', async () => {
    const checkoutDTO: CheckoutDTO = {
      idProduct: 1,
      quantity: 10,
    };

    const checkoutInput = {
      product: { connect: { id: checkoutDTO.idProduct } },
      quantity: checkoutDTO.quantity,
    };

    const checkout = await controller.update(checkoutDTO);

    expect(checkout).toEqual({
      id: expect.any(Number),
      ...checkoutInput,
    });

    expect(mockCheckoutService.create).toHaveBeenCalledWith(checkoutInput);
  });

  it('should delete a checkout item', async () => {
    const itemCheckout = {
      id: 1,
    };

    expect(await controller.delete(1)).toEqual({
      id: { id: itemCheckout.id },
      idProduct: expect.any(Number),
      quantity: expect.any(Number),
    });

    expect(mockCheckoutService.delete).toHaveBeenCalledWith(itemCheckout);
  });
});
