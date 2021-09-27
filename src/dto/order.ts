import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  addressDelivery: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  paymentMethod: string;
}
