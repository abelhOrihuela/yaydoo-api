import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  ParseIntPipe,
  Put,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Checkout } from '@prisma/client';
import { CheckoutsService } from './checkouts.service';

@Controller('checkouts')
export class CheckoutsController {
  constructor(private readonly checkoutService: CheckoutsService) {}

  @Get()
  async getAll(): Promise<Checkout[]> {
    return this.checkoutService.getAllByUser({});
  }

  @Post()
  async create(
    @Body('id', ParseIntPipe) idProducto: number,
    @Body('quantity', ParseIntPipe) quantity: number,
  ): Promise<Checkout> {
    const verifyIfExists = await this.checkoutService.verifyIfExists({
      idProducto: idProducto,
    });

    if (verifyIfExists) {
      return this.checkoutService.update(
        {
          id: verifyIfExists.id,
        },
        {
          quantity,
        },
      );
    } else {
      return this.checkoutService.create({
        product: {
          connect: { id: idProducto },
        },
        quantity,
      });
    }
  }

  @Put()
  async update(
    @Body('id', ParseIntPipe) idProducto: number,
    @Body('quantity', ParseIntPipe) quantity: number,
  ): Promise<Checkout> {
    const verifyIfExists = await this.checkoutService.verifyIfExists({
      idProducto: idProducto,
    });

    if (verifyIfExists) {
      return this.checkoutService.update(
        {
          id: verifyIfExists.id,
        },
        {
          quantity,
        },
      );
    } else {
      return this.checkoutService.create({
        product: {
          connect: { id: idProducto },
        },
        quantity,
      });
    }
  }

  @Delete('/:id')
  async deletePost(@Param('id', ParseIntPipe) id: number): Promise<Checkout> {
    const verifyIfExists = await this.checkoutService.verifyIfExists({
      id: id,
    });

    if (verifyIfExists) {
      return this.checkoutService.delete({ id: Number(id) });
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'This resource not exist!',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
