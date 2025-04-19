import { IsString, MinLength } from 'class-validator';

export class CreateExpensesCategoryDto {
  @IsString()
  @MinLength(1)
  name: string;
}
