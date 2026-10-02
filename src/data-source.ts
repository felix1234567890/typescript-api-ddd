import { DataSource } from 'typeorm';
import config from './config';
import { Book } from './modules/books/infra/typeorm/entity';
import { Review } from './modules/reviews/infra/typeorm/entity';
import { User } from './modules/users/infra/typeorm/entity';

export const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  synchronize: true,
  // every test run starts from an empty schema
  dropSchema: process.env.NODE_ENV === 'test',
  entities: [User, Book, Review],
});
