import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetCurrencyRequestDto {
  @ApiProperty({ example: 'BTC', description: 'fsyms', required: true })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(3)
  @Transform(({ value }) => value.toUpperCase())
  fsyms: string;

  @ApiProperty({ example: 'USD', description: 'tsyms', required: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(3)
  @Transform(({ value }) => value.toUpperCase())
  tsyms: string;
}
