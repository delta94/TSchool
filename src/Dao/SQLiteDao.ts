import { Database } from 'sqlite3';
import { AbstractDao } from './AbstractDao';
import dotenv from 'dotenv';
dotenv.config();

export default class SqliteDAO implements AbstractDao {
  public db: Database;

  constructor() {
    this.db = new Database(process.env.dbSqliteFile, err => {
      if (err) {
        console.log('Couldnt connect to Database');
      } else {
        console.log('Connected to Database');
      }
    });
  }

  public kill() {
    this.db.close();
  }

  // Create / Update / Insert that returns ID of change
  public run(sql: string, params: any[]) {
    return new Promise<{ id: number }>((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  // Gets a single row
  public getOne<T>(sql: string, params: any = []) {
    return new Promise<T>((resolve, reject) => {
      this.db.get(sql, params, function(err: any, result: T) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  // Gets all results
  public getAll<T>(sql: string, params: any = []) {
    return new Promise<T>((resolve, reject) => {
      this.db.all(sql, params, function(err: any, rows: T) {
        console.log(rows);
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}
