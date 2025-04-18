import { Module } from '@nestjs/common';
import { ExpensesModule } from '../expenses/expenses.module';
import { AppController } from './app.controller';

@Module({
  imports: [ExpensesModule],
  controllers: [AppController],
})
export class AppModule {}
