import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CheckoutsService } from './../checkouts/checkouts.service';
import { PrismaService } from './../prisma.service';
import { AppService } from './../app.service';
import { OrderDTO } from './../dto/order';

describe('OrdersController', () => {
  let controller: OrdersController;

  const mockOrdersService = {
    verifyIfExists: jest.fn(() => true),
    create: jest.fn((data: OrderDTO) => {
      const idOrder = Date.now();
      return {
        id: idOrder,
        total: 200,
        itemsTotal: 1,
        status: 'created',
        addressDelivery: data.addressDelivery,
        paymentMethod: data.paymentMethod,
        items: [
          {
            id: Date.now(),
            idOrder: idOrder,
            total: 200,
            quantity: 10,
            idProducto: 1,
            product: {
              id: 1,
              sku: 'CC-2043',
              name: 'Cerveza',
              description: 'Cerveza 250 ml',
              price: 20,
            },
          },
        ],
      };
    }),
    getAll: jest.fn((orderDTO) => {
      return {
        page: orderDTO.page,
        nextPage: orderDTO.page + 1,
        total: 1,
        perPage: orderDTO.perPage,
        data: [],
      };
    }),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [AppService, PrismaService, CheckoutsService, OrdersService],
    })
      .overrideProvider(OrdersService)
      .useValue(mockOrdersService)
      .compile();

    controller = app.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all orders', async () => {
    const orderDTO = {
      search: '',
      page: 1,
      perPage: 2,
      min: 0,
      max: 0,
    };
    expect(await controller.getAll(orderDTO)).toEqual({
      page: orderDTO.page,
      nextPage: orderDTO.page + 1,
      total: 1,
      perPage: orderDTO.perPage,
      data: [],
    });

    expect(mockOrdersService.getAll).toHaveBeenCalled();
  });

  it('should create order', async () => {
    const orderDTO: OrderDTO = {
      addressDelivery: 'Toluca',
      paymentMethod: 'cash',
    };

    const orderInput = {
      id: expect.any(Number),
      total: 200,
      itemsTotal: 1,
      status: 'created',
      addressDelivery: orderDTO.addressDelivery,
      paymentMethod: orderDTO.paymentMethod,
      items: [
        {
          id: expect.any(Number),
          idOrder: expect.any(Number),
          total: 200,
          quantity: 10,
          idProducto: 1,
          product: {
            id: 1,
            sku: 'CC-2043',
            name: 'Cerveza',
            description: 'Cerveza 250 ml',
            price: 20,
          },
        },
      ],
    };

    expect(await controller.create(orderDTO)).toEqual(orderInput);

    expect(mockOrdersService.create).toHaveBeenCalledWith(orderDTO);
  });
});
