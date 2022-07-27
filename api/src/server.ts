require("dotenv").config();
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { connectToDB } from "./configs/db.config";

const app: Application = express();

var whitelist = [
  "http://127.0.0.1:8080",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
  "http://127.0.0.1:80",
  "https://127.0.0.1:443",
  "http://127.0.0.1",
  "http://localhost:8080",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:80",
  "https://localhost:443",
  "http://localhost",
];

var corsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
    "Authorization",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Credentials",
    "Access-Control-Allow-Headers",
    "x-csrf-token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));
app.use(express.urlencoded());
app.use(express.json());

app.get("/api/hey", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Welcome to our API !",
  });
});
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/product", require("./routes/product.routes"));

app.listen(process.env.PORT || 8080, async () => {
  await connectToDB();
  console.log("Server started");
});
