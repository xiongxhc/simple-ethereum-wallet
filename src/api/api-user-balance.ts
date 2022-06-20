import { Request, Response } from "express";
import { getEthererumBalance } from "../rpc/getBalance";
import { GetBalanceError } from "../utils/error";
import { unhandledException } from "../utils/unhandledException";

const getUserBalance = async (req: Request, res: Response) => {
  try {
    const { eth_address, erc_token } = req.body;
    const eth_balance = await getEthererumBalance(eth_address);
    // TODO: getTokenBalance
    return res.status(200).json({ eth_balance });
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
  post: getUserBalance,
};
