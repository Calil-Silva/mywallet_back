import pg from 'pg';

const { Pool } = pg;

const connection = () => {
  let dataConnection;
  const nodeEnv = process.env.NODE_ENV;
  const isRunningLocally = nodeEnv === 'test' || nodeEnv === 'prod';
  const isRunningOnCloud = nodeEnv === 'cloud';

  if (isRunningLocally) {
    dataConnection = new Pool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
  }

  if (isRunningOnCloud) {
    dataConnection = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }
  return dataConnection;
};

export default connection();
