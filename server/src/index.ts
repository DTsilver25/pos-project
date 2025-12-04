import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import UserRouter from "./routes/user.ts";
import ProductRouter from "./routes/product.ts";
import SaleRouter from "./routes/sale.ts";
import AuthRouter from "./routes/auth.ts";
import { configDotenv } from "dotenv";
const port = 3000;

configDotenv({ path: path.resolve("../.env") });
const app = express();

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/users", UserRouter);
app.use("/api/products", ProductRouter);
app.use("/api/sales", SaleRouter);
app.use("/api/auth", AuthRouter);

app.listen(port, () => {
  console.log(`Listening in port ${port}`);
});
