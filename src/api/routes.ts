import { Router, Express } from "express";
import healthCheck from "./api-health-check";
import user from "./api-user";
import retrieveUserBalance from "./api-user-balance";

export const routes = (app: Express) => {
  const router = Router();

  router.get("/", healthCheck.get);

  router.get("/user", user.get);
  router.post("/user", user.post);

  router.post("/user/balance", retrieveUserBalance.post);

  app.use("/api", router);
};
