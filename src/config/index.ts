import 'dotenv/config';

interface Config {
  dbName: string;
  dbUser: string;
  dbPassword: string;
  secret: string;
}

export default {
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASS,
  secret: process.env.JWT_SECRET,
} as Config;
