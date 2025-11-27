import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { Pool } from "pg";
import path from "path";
import { configDotenv } from "dotenv";
const port = 3000;

configDotenv({ path: path.resolve("../.env") });

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: "127.0.0.1",
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
  database: process.env.POSTGRES_DB,
});
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

app.get("/ping", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log(result);
    res.json({
      status: "OK",
      db_time: result.rows[0].now,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Error DB", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Listening in port ${port}`);
});
