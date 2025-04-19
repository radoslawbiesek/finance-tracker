import { Module } from '@nestjs/common';

import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { ExpensesCategoriesController } from './expenses-categories.controller';
import { ExpensesCategoriesService } from './expenses-categories.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [ExpensesController, ExpensesCategoriesController],
  providers: [ExpensesService, ExpensesCategoriesService],
  imports: [DatabaseModule],
})
export class ExpensesModule {}
