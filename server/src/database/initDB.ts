import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Database from "../config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const initDB = async () => {
  const db = Database.getInstance();
  try {
    const schemaPath = path.join(__dirname, "queries/schema.sql");
    const sql = fs.readFileSync(schemaPath, "utf-8");
    console.log("Conectando a la base de Datos...");
    const client = await db.startConnection();

    console.log("Levantando tablas...");
    await client.query(sql);

    console.log("Tablas creadas");
    client.release();
  } catch (error) {
    console.log(error);
  } finally {
    await db.closeConnection();
    console.log("Conexion cerrada");
  }
};

initDB();
