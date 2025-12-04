import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import Database from "../config/db.js";
import { hashPassword } from "../helpers.ts/hashPassword.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hashPasswords = async (sql: string): Promise<string> => {
  // Expresión regular para encontrar INSERT de users con password
  const userInsertRegex =
    /INSERT INTO\s+users\s*\([^)]*password[^)]*\)\s*VALUES\s*\(([^)]+)\)/gi;

  let modifiedSql = sql;
  const matches = [...sql.matchAll(userInsertRegex)];

  for (const match of matches) {
    const fullMatch = match[0];
    const values = match[1];

    // Extraer la contraseña del VALUES
    const passwordMatch = values.match(/'([^']+)'/g);

    if (passwordMatch && passwordMatch.length >= 2) {
      const plainPassword = passwordMatch[1].replace(/'/g, "");
      const hashedPassword = await hashPassword(plainPassword);

      // Reemplazar la contraseña en texto plano con la hasheada
      const newInsert = fullMatch.replace(
        passwordMatch[1],
        `'${hashedPassword}'`
      );

      modifiedSql = modifiedSql.replace(fullMatch, newInsert);
    }
  }

  return modifiedSql;
};

const seedDB = async () => {
  const db = Database.getInstance();

  try {
    const schemaPath = path.join(__dirname, "queries/seed.sql");
    const sql = fs.readFileSync(schemaPath, "utf-8");

    console.log("Conectando a la base de Datos...");
    const client = await db.startConnection();

    console.log("Hasheando contraseñas...");
    const hashedSql = await hashPasswords(sql);

    console.log("Poblando tablas...");
    await client.query(hashedSql);

    console.log("Tablas pobladas exitosamente");
    client.release();
  } catch (error) {
    console.error("Error al poblar la base de datos:", error);
  } finally {
    await db.closeConnection();
    console.log("Conexión cerrada");
  }
};

seedDB();
