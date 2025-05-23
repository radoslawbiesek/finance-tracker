import { Injectable } from '@nestjs/common';
import Database from 'better-sqlite3';
import { BetterSQLite3Database, drizzle } from 'drizzle-orm/better-sqlite3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
  public db: BetterSQLite3Database;
  constructor(configService: ConfigService) {
    const dbUrl = configService.get('DATABASE_URL');
    const sqlite = new Database(dbUrl);
    this.db = drizzle({ client: sqlite });
  }
}
