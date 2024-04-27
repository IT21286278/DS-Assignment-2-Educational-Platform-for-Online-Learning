import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "./config/db_con.js";

dotenv.config({ path: "./config/.env" });

const app = express();

//middlewares
app.use(express.json()); //Send respones in json fomrat
app.use(morgan("tiny")); //log requests
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from express");
});

//server config
const PORT = process.env.PORT || 9000;
app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`Sever is running on port ${PORT}`);
  } catch (error) {
    console.log(err);
  }
});
