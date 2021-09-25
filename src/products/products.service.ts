import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Product, Prisma } from '@prisma/client';
import Pagination from 'src/helpers/pagination';
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
      page: page,
      total: await (await this.prisma.product.findMany({ where })).length,
      perPage: perPage,
      nextPage: page + 1,
      data: await this.prisma.product.findMany({
        skip,
        take: perPage,
        where,
      }),
    };

    return pagination;
  }

  async create(data: Prisma.ProductCreateInput): Promise<Product | string> {
    const verifyIfExists = await this.prisma.product.findFirst({
      where: {
        sku: data.sku,
      },
    });

    if (verifyIfExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'This sku was registered previously!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      return await this.prisma.product.create({ data });
    } catch (e) {
      throw e;
    }
  }
}
