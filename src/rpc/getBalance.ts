import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { ethers } from "ethers";
import { assets } from "../const/assets";
import { env } from "../const/env";
import { url as baseUrl } from "../const/url";
import { converNumberToDecimal, convertWeiToEther } from "../utils/conversion";
import { GetBalanceError } from "../utils/error";

interface RetrieveBalanceParams {
  eth_address: string;
  erc_token: string;
}

interface RetrieveBalanceValues {
  eth_balance: string;
  token_balance: string;
}

export const retrieveBalance = async ({
  eth_address,
  erc_token,
}: RetrieveBalanceParams): Promise<RetrieveBalanceValues> => {
  if (!ethers.utils.isAddress(eth_address)) {
    throw new GetBalanceError(`Invalid ethererum address: ${eth_address}`);
  }

  const url = `${baseUrl.ALCHEMY_BASE_URL}/${env.ALCHEMY_API_KEY}`;

  // Initialize an alchemy-web3 instance:
  const web3 = createAlchemyWeb3(url);

  // Query the blockchain
  const eth_raw_balance = await web3.eth
    .getBalance(eth_address)
    .catch((err) => {
      throw new GetBalanceError(
        `Fail to get ethereum balance for address: ${eth_address}`
      );
    });

  const { contractAddress, dp } = assets.find((i) => i.name === erc_token);
  const tokenContractAddresses = [contractAddress];

  const token_raw_balance = await web3.alchemy
    .getTokenBalances(eth_address, tokenContractAddresses)
    .catch((err) => {
      throw new GetBalanceError(
        `Fail to get token balance for address: ${eth_address}`
      );
    });

  return {
    eth_balance: convertWeiToEther(eth_raw_balance),
    token_balance: converNumberToDecimal(
      token_raw_balance.tokenBalances[0].tokenBalance,
      dp
    ),
  };
};
