import type { Request, Response } from "express";
import Database from "../../config/db.ts";
import readSql from "../../helpers.ts/readSql.ts";
import { hashPassword } from "../../helpers.ts/hashPassword.ts";

// Edita un usuario de la base de datos
const editUser = async (req: Request, res: Response) => {
  const db = Database.getInstance();
  const { id } = req.params;
  try {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
      res.send("Los campos no pueden quedar vacios").sendStatus(403);
      return;
    }
    const client = await db.startConnection();
    const sql = readSql("../database/queries/user/editUser.sql");
    const hashedPassword = await hashPassword(password);
    const user = await client.query(sql, [username, hashedPassword, role, id]);
    console.log(id);
    res
      .status(200)
      .json({ message: "Usuario editado exitosamente", user: user.rows });
    client.release();
  } catch (error) {
    console.log("fallo");
    console.log(error);
  }
};

export default editUser;
