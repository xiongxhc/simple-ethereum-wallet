import { Router, Express } from "express";
import healthCheck from "./api-health-check";
import registerUser from "./api-register-user";

export const routes = (app: Express) => {
  const router = Router();

  router.get("/", healthCheck.get);

  router.post("/register", registerUser.post);

  app.use("/api", router);
};
