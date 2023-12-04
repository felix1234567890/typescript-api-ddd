import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Book } from './modules/books/infra/typeorm/entity';
import { User } from './modules/users/infra/typeorm/entity';
import { Review } from './modules/reviews/infra/typeorm/entity';
config();

const devConfig = new DataSource({
  name: 'default',
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [User, Book, Review],
  dropSchema: true,
});
const testConfig = new DataSource({
  name: 'test',
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  synchronize: false,
  entities: [User, Book, Review],
  database: process.env.DB_NAME,
   dropSchema: true,
});
export const dataSource = process.env.NODE_ENV === 'test' ? testConfig : devConfig;
