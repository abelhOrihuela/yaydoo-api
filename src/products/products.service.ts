import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma.service';
import { Product, Prisma } from '@prisma/client';
import Pagination from './../helpers/pagination';
@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  async getAll(query): Promise<Pagination> {
    const skip = query.page > 1 ? (query.page - 1) * query.perPage : 0;

    const where = {
      ...(query.min != 0 && query.max != 0
        ? {
            AND: [
              {
                price: {
                  lte: query.max,
                  gte: query.min,
                },
              },
            ],
          }
        : {}),
      ...(query.search
        ? {
            OR: [
              { name: { contains: query.search } },
              { description: { contains: query.search } },
              { sku: { contains: query.search } },
            ],
          }
        : {}),
    };

    const pagination: Pagination = {
      data: await this.prisma.product.findMany({
        skip,
        take: query.perPage,
        where,
      }),
      page: query.page,
      total: await (await this.prisma.product.findMany({ where })).length,
      perPage: query.perPage,
      nextPage: query.page + 1,
    };

    return pagination;
  }

  async create(data: Prisma.ProductCreateInput): Promise<Product | string> {
    return await this.prisma.product.create({ data });
  }

  async verifyIfExists(
    where: Prisma.ProductWhereInput,
  ): Promise<Product | null> {
    return this.prisma.product.findFirst({
      where: {
        sku: where.sku,
      },
    });
  }
}
