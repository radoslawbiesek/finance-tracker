import { defineConfig } from 'drizzle-kit';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';

const configService = new ConfigService();
const dbUrl = configService.get('DATABASE_URL');
if (!dbUrl) {
  throw new Error('DATABASE_URL is not defined in the environment variables');
}

export default defineConfig({
  schema: './api/src/database/database.schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: dbUrl,
  },
});
