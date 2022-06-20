import express from "express";
import cors from "cors";
import { database } from "../database";
import { routes } from "./api/routes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Sequelize
try {
  // Currently using in memory database
  database.USER_TABLE.sync();
  database.ETH_ADDRESS_TABLE.sync();
  console.log(">>>>> Tables created successfully");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// Routes
routes(app);

// TODO: Register user

// TODO: Get username and address

// TODO: Get etherum balance and a specific token

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`>>>>> Server has started on port: ${PORT}`);
});
