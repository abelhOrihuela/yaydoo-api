import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma.service';
import { Checkout, Prisma } from '@prisma/client';

@Injectable()
export class CheckoutsService {
  constructor(private prisma: PrismaService) {}

  async getAllByUser(where: Prisma.CheckoutWhereInput): Promise<Checkout[]> {
    return this.prisma.checkout.findMany({ where: where });
  }

  async create(data: Prisma.CheckoutCreateInput): Promise<Checkout> {
    return this.prisma.checkout.create({ data });
  }

  async update(
    where: Prisma.CheckoutWhereUniqueInput,
    data: Prisma.CheckoutUpdateInput,
  ): Promise<Checkout> {
    return this.prisma.checkout.update({ where: { id: where.id }, data });
  }

  async delete(where: Prisma.CheckoutWhereUniqueInput): Promise<Checkout> {
    return this.prisma.checkout.delete({ where });
  }

  async verifyIfExists(
    where: Prisma.CheckoutWhereInput,
  ): Promise<Checkout | null> {
    return this.prisma.checkout.findFirst({
      where,
    });
  }
}
