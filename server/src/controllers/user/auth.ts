import type { Request, Response } from "express";
import Database from "../../config/db.ts";
import readSql from "../../helpers.ts/readSql.ts";
import bcrypt from "bcrypt";

// Verifica las credenciales de un usuario (nombre de usuario y contraseña)
// en caso de que no sea valida envia un 404 de usuario no encontrado

const verifyUser = async (req: Request, res: Response) => {
  const db = Database.getInstance();
  const { username, password } = req.body;
  try {
    const client = await db.startConnection();
    const sql = readSql("../database/queries/user/getUser.sql");
    const user = await client.query(sql, [username]);
    if (user.rows.length === 0) {
      res.status(404).json({ message: "Credenciales invalidas" });
      return;
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.rows[0].password
    );
    if (isPasswordCorrect) {
      res
        .status(200)
        .json({ message: "Inicio de sesion exitoso", user: user.rows[0] });
      return;
    }
    res.status(404).json({ message: "Credenciales invalidas" });
    client.release();
  } catch (error) {
    console.log(error);
  }
};

export default verifyUser;
