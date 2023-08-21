import { config } from 'dotenv';
import { DataSource } from 'typeorm';
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
  entities: ['./src/modules/**/infra/typeorm/entity/*.ts'],
});
const testConfig = new DataSource({
  name: 'default',
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  synchronize: true,
  entities: ['./src/modules/**/infra/typeorm/entity/*.ts'],
  database: 'lara',
})
export const dataSource = process.env.NODE_ENV === 'test' ? testConfig : devConfig;

