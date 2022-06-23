import { Request, Response } from "express";
import { getBalance } from "../web3/getBalance";
import { APIError, GetBalanceError } from "../utils/error";
import { unhandledException } from "../utils/unhandledException";

const retrieveUserBalance = async (req: Request, res: Response) => {
  try {
    const { eth_address, erc_token } = req.query;
    if (!eth_address || !erc_token) {
      throw new APIError(`Invalid inputs`);
    }
    const balance = await getBalance(eth_address, erc_token);
    return res.status(200).json(balance);
  } catch (err) {
    if (err instanceof APIError) {
      return res.status(500).json({
        message: err.message,
      });
    }
    if (err instanceof GetBalanceError) {
      return res.status(500).json({
        message: err.message,
      });
    }
    return unhandledException(err, req, res);
  }
};

export default {
  get: retrieveUserBalance,
};
