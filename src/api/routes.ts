import { Router, Express } from "express";
import healthCheck from "./api-health-check";
import user from "./api-user";
import retrieveUserBalance from "./api-user-balance";
import {
  apiGetUserValidate,
  apiRegisterUserValidate,
  apiGetUserBalanceValidate,
} from "./validation";

export const routes = (app: Express) => {
  const router = Router();

  router.get("/", healthCheck.get);

  router.get("/user", apiGetUserValidate, user.get);
  router.post("/user", apiRegisterUserValidate, user.post);

  router.get(
    "/user/balance",
    apiGetUserBalanceValidate,
    retrieveUserBalance.get
  );

  app.use("/api", router);
};
