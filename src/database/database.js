import pg from 'pg';

const { Pool } = pg;
const environment = process.env.NODE_ENV;
const connection = () => {
  let dataConnection;
  if (environment === 'prod') {
    dataConnection = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  } else {
    dataConnection = new Pool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
  }
  return dataConnection;
};

export default connection();
