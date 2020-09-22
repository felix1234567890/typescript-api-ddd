require('dotenv/config');
const devConfig = {
  name: 'default',
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: ['./src/modules/**/infra/typeorm/entity/*.ts'],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
};
const testConfig = {
  ...devConfig,
  database: 'lara',
};
module.exports = process.env.NODE_ENV === 'test' ? testConfig : devConfig;
