import 'dotenv/config';
import { ConnectionOptions } from 'typeorm';
import { Currency } from '../../modules/crypto/entities/currency.entity';

export const ormConfig: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'dbPassword',
  database: process.env.DB || 'api_db',
  entities: [Currency],
  migrations: ['src/migrations/*.{ts,js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  synchronize: true,
};
