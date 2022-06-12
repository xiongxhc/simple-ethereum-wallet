import express, { Request, Response } from "express";
import cors from "cors";
import { database } from "../database"

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Sequelize
database.sequelize.sync();

// Routes
app.get("/", (req: Request, res: Response) => {
    return res.status(200).json({ message: "health check"});
})

// TODO: Register user

// TODO: Get username and address

// TODO: Get etherum balance and a specific token


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`>>>>> Server has started on port: ${PORT}`);
});
