import { Router, Express } from "express";
import healthCheck from "./api-health-check";
import user from "./api-user";

export const routes = (app: Express) => {
  const router = Router();

  router.get("/", healthCheck.get);

  router.get("/user", user.get);
  router.post("/user", user.post);

  app.use("/api", router);
};
