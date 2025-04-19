import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExpensesCategoriesService } from './expenses-categories.service';
import { CreateExpensesCategoryDto } from './dto/create-expenses-category.dto';
import { UpdateExpensesCategoryDto } from './dto/update-expenses-category.dto';

@Controller('expenses-categories')
export class ExpensesCategoriesController {
  constructor(
    private readonly expensesCategoriesService: ExpensesCategoriesService
  ) {}

  @Post()
  create(@Body() createExpensesCategoryDto: CreateExpensesCategoryDto) {
    return this.expensesCategoriesService.create(createExpensesCategoryDto);
  }

  @Get()
  findAll() {
    return this.expensesCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expensesCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExpensesCategoryDto: UpdateExpensesCategoryDto
  ) {
    return this.expensesCategoriesService.update(
      +id,
      updateExpensesCategoryDto
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expensesCategoriesService.remove(+id);
  }
}
