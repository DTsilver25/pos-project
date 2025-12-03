import { Pool } from "pg";
import { configDotenv } from "dotenv";
import path from "path";

configDotenv({ path: path.resolve(process.cwd(), "../.env") });

class Database {
  private static instance: Database;
  private pool: Pool;
  private constructor() {
    this.pool = new Pool({
      user: process.env.POSTGRES_USER,
      host: "127.0.0.1",
      password: process.env.POSTGRES_PASSWORD,
      port: Number(process.env.DB_PORT),
      database: process.env.POSTGRES_DB,
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async startConnection() {
    return await this.pool.connect();
  }

  public async closeConnection() {
    return await this.pool.end();
  }
}

export default Database;
