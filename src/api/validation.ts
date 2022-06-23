import { Request, Response } from "express";
import { validationResult, body, query } from "express-validator";
import { assets } from "../const/assets";

const validate = (validations) => {
  return async (req: Request, res: Response, next: () => any) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(422).json({
      errors: errors.array(),
    });
  };
};

export const apiRegisterUserValidate = validate([
  body("username").isString().isLength({ max: 50 }),
  body("password").isString().isLength({ max: 255 }),
]);

export const apiGetUserValidate = validate([
  query("username").isLength({ max: 50 }),
]);

export const apiGetUserBalanceValidate = validate([
  query("eth_address").isLength({ max: 42, min: 42 }),
  query("erc_token")
    .custom((token) => {
      return assets.find((i) => i.name === token);
    }),
]);
