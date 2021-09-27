import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from './../prisma.service';
import Pagination from './../helpers/pagination';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async getAllByUser(query): Promise<Pagination> {
    const skip = query.page > 1 ? (query.page - 1) * query.perPage : 0;

    const pagination: Pagination = {
      data: await this.prisma.order.findMany({
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
        skip,
        take: query.perPage,
      }),
      page: query.page,
      total: await (await this.prisma.order.findMany()).length,
      perPage: query.perPage,
      nextPage: query.page + 1,
    };

    return pagination;
  }

  async create(data): Promise<Order> {
    const products = await this.prisma.checkout.findMany({
      include: {
        product: true,
      },
    });

    const order = await this.prisma.order.create({
      data: {
        total: products
          .map((l) => {
            console.log(l.product.price * l.quantity)
            return l.product.price * l.quantity
          })
          .reduce((prev, next) => prev + next, 0),
        itemsTotal: products.length,
        status: 'created',
        addressDelivery: data.addressDelivery,
        paymentMethod: data.paymentMethod,
        items: {
          create: products.map(checkout => ({
            total: checkout.product.price * checkout.quantity,
            quantity: checkout.quantity,
          }))
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

  
    const deleteManyPosts = products.map((checkout) => {
      return this.prisma.checkout.delete({
        where: {
          id: checkout.id,
        },
      });
    });

    Promise.all(deleteManyPosts);

    return order
  }
}
