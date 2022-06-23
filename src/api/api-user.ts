import { Request, Response } from "express";
import { database } from "../../database";
import { encrypt } from "../utils/encryption";
import { APIError, CreateEthereumAddressError } from "../utils/error";
import { createEthereumAddress } from "../utils/ethereum";
import { unhandledException } from "../utils/unhandledException";

interface RegisterUserParams {
  username: string;
  password: string;
}

const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password }: RegisterUserParams = req.body;

    const eth_address = await createEthereumAddress();

    const data = {
      username,
      password: encrypt({ str: password }),
      eth_address,
      created_on: new Date().getTime(),
    };

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
    if (err instanceof CreateEthereumAddressError) {
      return res.status(500).json({
        message: err.message,
      });
    }
    return unhandledException(err, req, res);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.query;

    if(!username) {
      throw new APIError(`Fail to find user: ${username}`);
    }

    const user: any = await database.USER_TABLE.findOne({
      where: { username },
    });
    if (!user) {
      throw new APIError(`Fail to find user: ${username}`);
    }
    const { eth_address } = user;
      return res.status(200).json({ eth_address });
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
