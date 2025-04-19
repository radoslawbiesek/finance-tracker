import { Optional } from '@nestjs/common';
import { IsDateString, IsInt, IsNumber, IsString } from 'class-validator';

export class CreateExpenseDto {
  @IsInt()
  categoryId: number;

  @IsString()
  title: string;

  @Optional()
  @IsString()
  description: string;

  @IsNumber()
  amount: number;

  @IsDateString()
  date: string;
}
