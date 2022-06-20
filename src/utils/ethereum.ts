import { randomBytes } from "crypto";
import { Wallet } from "ethers";
import { database } from "../../database";
import { CreateEthereumAddressError } from "./error";

export const generateAddress = () => {
  const private_key = "0x" + randomBytes(32).toString("hex");
  const { address } = new Wallet(private_key);
  return { eth_address: address, private_key };
};

export const createEthereumAddress = async (): Promise<String> => {
  try {
    const wallet = generateAddress();
    const entry = await database.ETH_ADDRESS_TABLE.create(wallet);
    if (entry) {
      return wallet.eth_address;
    }
  } catch (err) {
    throw new CreateEthereumAddressError("Unable to create ethereum address");
  }
};
