import { Request, Response } from "express";
import { retrieveBalance } from "../rpc/getBalance";
import { GetBalanceError } from "../utils/error";
import { unhandledException } from "../utils/unhandledException";

const retrieveUserBalance = async (req: Request, res: Response) => {
  try {
    const { eth_address, erc_token } = req.body;
    const balance = await retrieveBalance({ eth_address, erc_token });
    return res.status(200).json(balance);
  } catch (err) {
    if (err instanceof GetBalanceError) {
      return res.status(500).json({
        message: err.message,
      });
    }
    return unhandledException(err, req, res);
  }
};

export default {
  post: retrieveUserBalance,
};
