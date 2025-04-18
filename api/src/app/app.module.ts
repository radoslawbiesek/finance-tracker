import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ExpensesModule } from '../expenses/expenses.module';
import { AppController } from './app.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ExpensesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
