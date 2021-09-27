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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Checkout } from '@prisma/client';
import { CheckoutsService } from './checkouts.service';
import { CheckoutDTO } from '../dto/checkout';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiProperty,
} from '@nestjs/swagger';

@Controller('checkouts')
export class CheckoutsController {
  constructor(private readonly checkoutService: CheckoutsService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiTags('checkout')
  @ApiOperation({ summary: 'Get checkout' })
  @ApiResponse({ status: 200, description: 'Search succesfully' })
  async getAll(): Promise<Checkout[]> {
    return this.checkoutService.getAllByUser({});
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiTags('checkout')
  @ApiOperation({ summary: 'Create or update checkout' })
  @ApiResponse({
    status: 201,
    description: 'This item was updated succesfully!',
  })
  @ApiResponse({
    status: 200,
    description: 'This item was created succesfully!',
  })
  @ApiProperty({ type: CheckoutDTO })
  async create(@Body() checkoutDTO: CheckoutDTO): Promise<Checkout> {
    
    const verifyIfExists = await this.checkoutService.verifyIfExists(
      checkoutDTO.idProduct,
    );

    if (verifyIfExists) {
      return this.checkoutService.update(
        {
          id: verifyIfExists.id,
        },
        checkoutDTO,
      );
    } else {
      return this.checkoutService.create({
        product: {
          connect: {
            id: checkoutDTO.idProduct
          }
        },
        quantity: checkoutDTO.quantity
      });
    }
  }

  @Put()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiTags('checkout')
  @ApiOperation({ summary: 'Update or create checkout' })
  @ApiResponse({
    status: 200,
    description: 'This item was updated succesfully!',
  })
  @ApiResponse({
    status: 201,
    description: 'This item was created succesfully!',
  })
  @ApiProperty({ type: CheckoutDTO })
  async update(@Body() checkoutDTO: CheckoutDTO): Promise<Checkout> {
    const verifyIfExists = await this.checkoutService.verifyIfExists(
      checkoutDTO.idProduct,
    );

    if (verifyIfExists) {
      return this.checkoutService.update(
        {
          id: verifyIfExists.id,
        },
        checkoutDTO,
      );
    } else {
      return this.checkoutService.create({
        product: {
          connect: {
            id: checkoutDTO.idProduct
          }
        },
        quantity: checkoutDTO.quantity
      });
    }
  }

  @Delete('/:id')
  @ApiTags('checkout')
  @ApiOperation({ summary: 'Delete item checkout' })
  @ApiResponse({
    status: 200,
    description: 'This item was deleted succesfully!',
  })
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
