import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckoutDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  idProduct: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  quantity: number;
}
