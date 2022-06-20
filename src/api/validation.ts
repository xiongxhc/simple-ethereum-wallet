import { Request } from "express";
import { validationResult, body } from "express-validator";
import { request } from "http";
import { assets } from "../const/assets";

const validate = (validations) => {
  return async (req, res, next) => {
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
  body("username").isString().isLength({ max: 50 }),
]);

export const apiGetUserBalanceValidate = validate([
  body("eth_address").isString().isLength({ max: 42, min: 42 }),
  body("erc_token").isString().custom((value)=>{
    return assets.find((i) => i.name === value);
  }),
]);