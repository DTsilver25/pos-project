import type { Request, Response } from "express";
import Database from "../../config/db.ts";
import readSql from "../../helpers.ts/readSql.ts";

const createUsers = async (req: Request, res: Response) => {
  const db = Database.getInstance();
  try {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
      res
        .send("Debe especificar un nombre de usuario y contraseña")
        .sendStatus(403);
      return;
    }
    const client = await db.startConnection();
    const sql = readSql("../database/queries/user/createUser.sql");
    const user = await client.query(sql, [username, password, role]);
    res
      .status(200)
      .json({ message: "Usuario creado exitosamente", user: user.rows });
    client.release();
  } catch (error) {
    console.log("fallo");
    console.log(error);
  }
};

export default createUsers;
