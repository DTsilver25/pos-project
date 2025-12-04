import type { Request, Response } from "express";
import Database from "../../config/db.ts";
import readSql from "../../helpers.ts/readSql.ts";
import { hashPassword } from "../../helpers.ts/hashPassword.ts";

const editProduct = async (req: Request, res: Response) => {
  const db = Database.getInstance();
  const { id } = req.params;
  try {
    const { name, price, stock, description } = req.body;
    if (!name || !price || !stock) {
      res.send("Los campos no pueden quedar vacios").sendStatus(403);
      return;
    }
    const client = await db.startConnection();
    const sql = readSql("../database/queries/product/editProduct.sql");
    const product = await client.query(sql, [
      name,
      price,
      stock,
      description,
      id,
    ]);
    res
      .status(200)
      .json({ message: "Producto editado exitosamente", user: product.rows });
    client.release();
  } catch (error) {
    console.log("fallo");
    console.log(error);
  }
};

export default editProduct;
