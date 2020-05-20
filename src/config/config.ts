import dotenv from 'dotenv';

dotenv.config();

export const config = {
  app: {
    name: process.env.NAME || 'Server',
    port: process.env.PORT || 8080,
    host: process.env.HOST || '0.0.0.0'
  },
  database: getActiveDatabase(process.env.ACTIVE_DB || 'mysql2')
};

function getActiveDatabase(db: string) {
  if (db === 'mysql2') {
    return {
      client: db,
      connection: {
        user: process.env.DB_MYSQL_USER,
        password: process.env.DB_MYSQL_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST || '127.0.0.1'
      }
    };
  }
}
