//import mysql from 'serverless-mysql';
import { createPool } from 'mysql2/promise';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './config';

// export const pool = mysql({ 
//   config: {
//     host: DB_HOST,
//     user: DB_USER,
//     password: DB_PASSWORD,
//     port: DB_PORT,
//     database: DB_DATABASE
//   }
// });

export const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_DATABASE
});
