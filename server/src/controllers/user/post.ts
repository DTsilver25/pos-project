import type { Request, Response } from "express";
import Database from "../../config/db.ts";
import readSql from "../../helpers.ts/readSql.ts";
import { hashPassword } from "../../helpers.ts/hashPassword.ts";

const createUsers = async (req: Request, res: Response) => {
  const db = Database.getInstance();
  try {
    const { username, password, role } = req.body;
    const client = await db.startConnection();
    const sql = readSql("../database/queries/user/createUser.sql");
    const hashedPassword = await hashPassword(password);
    const user = await client.query(sql, [username, hashedPassword, role]);
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
