import type { Request, Response } from "express";
import Database from "../../config/db.ts";
import readSql from "../../helpers.ts/readSql.ts";

const createSale = async (req: Request, res: Response) => {
  const db = Database.getInstance();
  try {
    const { userId, total, paymentMethod } = req.body;
    if (!userId || !total || !paymentMethod) {
      res.send("Campos Faltantes").sendStatus(403);
      return;
    }
    const client = await db.startConnection();
    const sql = readSql("../database/queries/sales/createSale.sql");
    const sale = await client.query(sql, [userId, total, paymentMethod]);
    res
      .status(200)
      .json({ message: "Venta realizada exitosamente", user: sale.rows });
    client.release();
  } catch (error) {
    console.log("fallo");
    console.log(error);
  }
};

export default createSale;
