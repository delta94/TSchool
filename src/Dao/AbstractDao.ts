export interface AbstractDao {
  run(sql: string, params: any[]): Promise<{ id: number }>;
  getOne<T>(sql: string, params: any[]): Promise<T>;
  getAll<T>(sql: string, params: any[]): Promise<T[]>;
  kill(): void;
}
