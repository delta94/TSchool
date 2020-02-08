import mysql from 'mysql';
import { AbstractDao } from './AbstractDao';
import dotenv from 'dotenv';
dotenv.config();

// This provides an interface to getOne, getAll and Run a SQL command
export class SqlDAO implements AbstractDao {
  public db: mysql.Connection;

  constructor() {
    this.db = mysql.createConnection({
      host: process.env.dbHost,
      user: process.env.dbUser,
      password: process.env.dbPass,
      database: process.env.dbDatabase,
    });
    this.db.connect();
  }

  public kill() {
    this.db.destroy();
  }

  // Will execute a query for Update/Insert/Delete
  public run(sql: string, params: any[]) {
    return new Promise<{ id: number }>((resolve, reject) => {
      this.db.query(sql, params, function(err, res) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: res.insertId });
        }
      });
    });
  }

  // Will execute a query in order to get 1 entry from a DB
  public getOne<T>(sql: string, params: any = []) {
    return new Promise<T>((resolve, reject) => {
      this.db.query(sql, params, (err: mysql.MysqlError | null, row: T[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(row[0]);
        }
      });
    });
  }

  // Will execute a query to get multiple entries from a DB
  public getAll<T>(sql: string, params: any = []) {
    return new Promise<T[]>((resolve, reject) => {
      this.db.query(sql, params, (err: mysql.MysqlError | null, rows: T[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}
