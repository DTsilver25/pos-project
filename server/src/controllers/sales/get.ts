import type { Request, Response } from "express";
import Database from "../../config/db.ts";
import readSql from "../../helpers.ts/readSql.ts";

// Trae todas las ventas realizadas de la base de datos
const getSales = async (req: Request, res: Response) => {
  const db = Database.getInstance();
  try {
    const client = await db.startConnection();
    const sql = readSql("../database/queries/sales/getSales.sql");
    const sales = await client.query(sql);
    res.status(200).json({ message: "Ventas traidas", sales: sales.rows });
    client.release();
  } catch (error) {
    console.log(error);
  }
};

export default getSales;
