import { dataSource } from '../../../data-source';
import app from './app';
dataSource
.initialize()
.catch((err: unknown) => {
  console.error('Error during Data Source initialization', err);
});
const server = app.listen(5000);
export default server
