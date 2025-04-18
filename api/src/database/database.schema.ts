import { int, sqliteTable, text, real } from 'drizzle-orm/sqlite-core';

export const expensesCategories = sqliteTable('expenses_categories', {
  id: int('id').primaryKey(),
  userId: int('user_id').notNull(),
  name: int('name').notNull(),
});

export const expenses = sqliteTable('expenses', {
  id: int('id').primaryKey(),
  userId: int('user_id').notNull(),
  categoryId: int('category_id')
    .notNull()
    .references(() => expensesCategories.id, { onDelete: 'set null' }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  amount: real('amount').notNull(),
  date: text('date').notNull(),
});

export const databaseSchema = {
  expenses,
  expensesCategories,
};
