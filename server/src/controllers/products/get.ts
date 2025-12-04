import type { Request, Response } from "express";
import Database from "../../config/db.ts";
import readSql from "../../helpers.ts/readSql.ts";

// Trae todos los productos de la base de datos
const getProducts = async (req: Request, res: Response) => {
  const db = Database.getInstance();
  try {
    const client = await db.startConnection();
    const sql = readSql("../database/queries/product/getProducts.sql");
    const products = await client.query(sql);
    res
      .status(200)
      .json({ message: "Productos traidos", products: products.rows });
    client.release();
  } catch (error) {
    console.log(error);
  }
};

export default getProducts;
