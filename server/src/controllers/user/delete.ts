import type { Request, Response } from "express";
import Database from "../../config/db.ts";
import readSql from "../../helpers.ts/readSql.ts";

// Elimina un usuario de la base de datos y en caso de error envia una respuesta
const deleteUser = async (req: Request, res: Response) => {
  const db = Database.getInstance();
  const { id } = req.params;
  try {
    const client = await db.startConnection();
    const sql = readSql("../database/queries/user/deleteUser.sql");
    const deletedUser = await client.query(sql, [Number(id)]);
    if (deletedUser.rows.length === 0) {
      res.status(404).json({ error: "El usuario no fue encontrado" });
      return;
    }
    const username = deletedUser.rows[0].username;
    res.status(200).json({
      message: `Usuario ${username} eliminado correctamente.`,
    });
    client.release();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ha ocurrido un error" });
  }
};

export default deleteUser;
