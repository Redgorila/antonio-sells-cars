import * as dotenv from 'dotenv'
dotenv.config()

export default () => {
  const configuration = process.env.DB_SOCKET
    ? {
        port: parseInt(process.env.PORT) || 3000,
        db_socket: process.env.DB_SOCKET,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database_name: process.env.DATABASE_NAME,
        db_port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
      }
    : {
        port: parseInt(process.env.PORT) || 3000,
        host: process.env.DB_HOST,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database_name: process.env.DATABASE_NAME,
        db_port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
      }

  return configuration
}
