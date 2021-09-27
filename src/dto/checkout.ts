import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckoutDTO {
  constructor(idProduct: number, quantity: number) {
    this.idProduct = idProduct;
    this.quantity = quantity;
  }
  @ApiProperty({ required: true })
  @IsNotEmpty()
  idProduct: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  quantity: number;
}
