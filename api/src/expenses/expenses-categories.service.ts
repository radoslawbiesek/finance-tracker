import { Injectable, NotFoundException } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';

import { CreateExpensesCategoryDto } from './dto/create-expenses-category.dto';
import { UpdateExpensesCategoryDto } from './dto/update-expenses-category.dto';
import { DatabaseService } from '../database/database.service';
import { expensesCategories } from '../database/schema/expenses.schema';

@Injectable()
export class ExpensesCategoriesService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createExpensesCategoryDto: CreateExpensesCategoryDto) {
    const userId = 1; // TODO: get user id from request

    return this.databaseService.db
      .insert(expensesCategories)
      .values({
        userId,
        ...createExpensesCategoryDto,
      })
      .returning();
  }

  async findAll() {
    const userId = 1; // TODO: get user id from request

    const results = await this.databaseService.db
      .select()
      .from(expensesCategories)
      .where(eq(expensesCategories.userId, userId));

    return { results };
  }

  async findOne(id: number) {
    const userId = 1; // TODO: get user id from request

    const result = await this.databaseService.db
      .select()
      .from(expensesCategories)
      .where(
        and(
          eq(expensesCategories.userId, userId),
          eq(expensesCategories.id, id)
        )
      );

    if (!result.length) {
      throw new NotFoundException(`Expenses category with id ${id} not found`);
    }

    return result[0];
  }

  async update(
    id: number,
    updateExpensesCategoryDto: UpdateExpensesCategoryDto
  ) {
    const userId = 1; // TODO: get user id from request

    const result = await this.databaseService.db
      .update(expensesCategories)
      .set(updateExpensesCategoryDto)
      .where(
        and(
          eq(expensesCategories.userId, userId),
          eq(expensesCategories.id, id)
        )
      )
      .returning();

    if (result.length === 0) {
      throw new NotFoundException(`Expenses category with id ${id} not found`);
    }

    return result[0];
  }

  async remove(id: number) {
    const userId = 1; // TODO: get user id from request

    const result = await this.databaseService.db
      .delete(expensesCategories)
      .where(
        and(
          eq(expensesCategories.userId, userId),
          eq(expensesCategories.id, id)
        )
      )
      .returning();

    if (result.length === 0) {
      throw new NotFoundException(`Expenses category with id ${id} not found`);
    }

    return result[0];
  }
}
