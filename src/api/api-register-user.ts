import { Request, Response } from "express";
import { database } from "../../database";
import { encrypt } from "../utils/encryption";
import { DatabaseInsertError } from "../utils/error";
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

    // TODO: Insert data to database
    const user = await database.User.create(data);
    if (user) {
      return res.status(200).json({ username, eth_address });
    }
    throw new DatabaseInsertError(`Fail to register user: ${username}`);
  } catch (err) {
    if (err instanceof DatabaseInsertError) {
      return res.status(500).json({
        message: err.message,
      });
    }
    return unhandledException(req, res);
  }
};

export default {
  post: registerUser,
};
