import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { ethers } from "ethers";
import { env } from "../const/env";
import { url as baseUrl } from "../const/url";
import { convertWeiToEther } from "../utils/conversion";
import { GetBalanceError } from "../utils/error";

export const getEthererumBalance = async (
  eth_address: string
): Promise<string> => {
  if (!ethers.utils.isAddress(eth_address)) {
    throw new GetBalanceError(`Invalid ethererum address: ${eth_address}`);
  }

  const url = `${baseUrl.ALCHEMY_BASE_URL}/${env.ALCHEMY_API_KEY}`;

  // Initialize an alchemy-web3 instance:
  const web3 = createAlchemyWeb3(url);

  // Query the blockchain
  const balance = await web3.eth.getBalance(eth_address).catch((err) => {
    throw new GetBalanceError(
      `Fail to get ethereum balance for address: ${eth_address}`
    );
  });

  return convertWeiToEther(balance);
};

export const getTokenBalance = async (eth_address: string): Promise<string> => {
  
  return "NOT IMPLEMENTED";
};
