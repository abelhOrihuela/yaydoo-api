import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  readonly search: string;

  @ApiProperty({ required: false })
  @IsOptional()
  readonly page: number = 1;

  @ApiProperty({ required: false })
  @IsOptional()
  readonly perPage: number = 10;

  @ApiProperty({ required: false })
  @IsOptional()
  readonly min: number = 0;

  @ApiProperty({ required: false })
  @IsOptional()
  readonly max: number = 0;
}
