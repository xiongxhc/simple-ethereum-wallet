import { Request, Response } from "express";
import { database } from "../../database";
import { encrypt } from "../utils/encryption";
import { APIError } from "../utils/error";
import { unhandledException } from "../utils/unhandledException";

const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // TODO: Create ethereum address
    const eth_address = "";

    const data = {
      username,
      password: encrypt({ str: password }),
      eth_address,
      created_on: new Date().getTime(),
    };

    // Insert data to database
    const user = await database.USER_TABLE.create(data);
    if (user) {
      return res.status(200).json({ username, eth_address });
    }
    throw new APIError(`Fail to register user: ${username}`);
  } catch (err) {
    if (err instanceof APIError) {
      return res.status(500).json({
        message: err.message,
      });
    }
    return unhandledException(err, req, res);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    const user = await database.USER_TABLE.findOne({
      where: { username },
    });
    if (user) {
      const { eth_address } = user as any;
      return res.status(200).json({ eth_address });
    }
    throw new APIError(`Fail to find user: ${username}`);
  } catch (err) {
    if (err instanceof APIError) {
      return res.status(500).json({
        message: err.message,
      });
    }
    return unhandledException(err, req, res);
  }
};

export default {
  get: getUser,
  post: registerUser,
};
