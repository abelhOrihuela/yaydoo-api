import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma.service';
import { Product, Prisma } from '@prisma/client';
import Pagination from './../helpers/pagination';
@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  async getAll(
    search: string,
    page: number,
    perPage: number,
    min: number,
    max: number,
  ): Promise<Pagination> {
    const skip = page > 0 ? (page - 1) * perPage : 0;
    const where = {
      ...(min && max
        ? {
            AND: [
              {
                price: {
                  lte: max,
                  gte: min,
                },
              },
            ],
          }
        : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search } },
              { description: { contains: search } },
              { sku: { contains: search } },
            ],
          }
        : {}),
    };

    const pagination: Pagination = {
      data: await this.prisma.product.findMany({
        skip,
        take: perPage,
        where,
      }),
      page: page,
      total: await (await this.prisma.product.findMany({ where })).length,
      perPage: perPage,
      nextPage: page + 1,
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
      where,
    });
  }
}
