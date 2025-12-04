import type { Request, Response } from "express";
import Database from "../../config/db.ts";
import readSql from "../../helpers.ts/readSql.ts";

// Crea un producto en la base de datos con informacion proporcionada en el body en JSON
const createProduct = async (req: Request, res: Response) => {
  const db = Database.getInstance();
  const { name, price, stock, description } = req.body;
  try {
    if (!name || !price || !stock) {
      res
        .send("Debe especificar por lo menos un nombre y un precio")
        .sendStatus(403);
      return;
    }
    const client = await db.startConnection();
    const sql = readSql("../database/queries/product/createProduct.sql");
    const product = await client.query(sql, [name, price, stock, description]);
    res
      .status(200)
      .json({ message: "Producto creado exitosamente", product: product.rows });
    client.release();
  } catch (error) {
    console.log("fallo");
    console.log(error);
  }
};

export default createProduct;
