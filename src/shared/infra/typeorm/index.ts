import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection | undefined> => {
  const options = await getConnectionOptions();
  return await createConnection(options);
};
