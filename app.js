import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

const host = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;

const corsOptions = {
    origin: true,
    credentials: true,
  };
  
  app.use(cors(corsOptions));
  
  
  app.use(express.json());
  
  app.use(express.urlencoded({ extended: true }));
  
  app.get("/", (req, res) => {
    res.send("server working");
  });
  
  app.listen(port, host, () => {
    console.log(`Server is running at http://${host}:${port}`);
  });