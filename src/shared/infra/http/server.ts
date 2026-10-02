import app from './app';
import { dataSource } from '../../../data-source';

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    app.listen(5000);
  })
  .catch((err: unknown) => {
    console.error('Error during Data Source initialization', err);
    process.exit(1);
  });
