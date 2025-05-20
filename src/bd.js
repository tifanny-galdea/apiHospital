
import mysql from 'mysql2/promise';

import {
    MYSQL_ADDON_HOST,
    MYSQL_ADDON_DB,
    MYSQL_ADDON_USER,
    MYSQL_ADDON_PASSWORD,
    MYSQL_ADDON_PORT ,
} from './config.js'

export const conmysql = await mysql.createPool({
  host: MYSQL_ADDON_HOST,
  database: MYSQL_ADDON_DB,
  user: MYSQL_ADDON_USER,
  password: MYSQL_ADDON_PASSWORD,
  port: MYSQL_ADDON_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});