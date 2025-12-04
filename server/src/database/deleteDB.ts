import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Database from "../config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const deleteDB = async () => {
  const db = Database.getInstance();
  try {
    const schemaPath = path.join(__dirname, "queries/dropSchema.sql");
    const sql = fs.readFileSync(schemaPath, "utf-8");
    console.log("Conectando a la base de Datos...");
    const client = await db.startConnection();

    console.log("Eliminando las tablas...");
    await client.query(sql);

    console.log("Tablas eliminadas correctamente");
    client.release();
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Conexion cerrada");
    await db.closeConnection();
  }
};

deleteDB();
