import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { eq, and } from 'drizzle-orm';
import { SqliteError } from 'better-sqlite3';

import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { DatabaseService } from '../database/database.service';
import { expenses } from '../database/schema/expenses.schema';

@Injectable()
export class ExpensesService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createExpenseDto: CreateExpenseDto) {
    try {
      const userId = 1; // TODO: Get user ID from request context

      const result = await this.databaseService.db
        .insert(expenses)
        .values({
          userId: userId,
          ...createExpenseDto,
        })
        .returning();

      return result[0];
    } catch (error: unknown) {
      this.handleCategoryError(error);

      throw error;
    }
  }

  async findAll() {
    const userId = 1; // TODO: Get user ID from request context

    const results = await this.databaseService.db
      .select()
      .from(expenses)
      .where(eq(expenses.userId, userId));

    return { results };
  }

  async findOne(id: number) {
    const userId = 1; // TODO: Get user ID from request context

    const result = await this.databaseService.db
      .select()
      .from(expenses)
      .where(and(eq(expenses.userId, userId), eq(expenses.id, id)));

    if (result.length === 0) {
      throw new NotFoundException(`Expense with id ${id} not found`);
    }

    return result[0];
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    try {
      const userId = 1; // TODO: Get user ID from request context

      const result = await this.databaseService.db
        .update(expenses)
        .set(updateExpenseDto)
        .where(and(eq(expenses.userId, userId), eq(expenses.id, id)))
        .returning();

      if (result.length === 0) {
        throw new NotFoundException(`Expense with id ${id} not found`);
      }

      return result[0];
    } catch (error: unknown) {
      this.handleCategoryError(error);

      throw error;
    }
  }

  async remove(id: number) {
    const userId = 1; // TODO: Get user ID from request context

    const result = await this.databaseService.db
      .delete(expenses)
      .where(and(eq(expenses.userId, userId), eq(expenses.id, id)))
      .returning();

    if (result.length === 0) {
      throw new NotFoundException(`Expense with id ${id} not found`);
    }

    return result[0];
  }

  private handleCategoryError(error: unknown) {
    if (
      error instanceof SqliteError &&
      error.code === 'SQLITE_CONSTRAINT_FOREIGNKEY'
    ) {
      throw new BadRequestException(`Category does not exist`);
    }
  }
}
