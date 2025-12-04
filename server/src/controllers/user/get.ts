import type { Request, Response } from "express";
import Database from "../../config/db.ts";
import readSql from "../../helpers.ts/readSql.ts";

const getUsers = async (req: Request, res: Response) => {
  const db = Database.getInstance();
  try {
    const client = await db.startConnection();
    const sql = readSql("../database/queries/user/getUsers.sql");
    console.log(sql);
    const users = await client.query(sql);
    res.status(200).json({ message: "Usuarios traidos", users: users.rows });
    client.release();
  } catch (error) {
    console.log(error);
  }
};

export default getUsers;
