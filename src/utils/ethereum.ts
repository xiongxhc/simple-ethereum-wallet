import { randomBytes } from "crypto";
import { Wallet } from "ethers";
import { database } from "../../database";
import { CreateEthereumAddressError } from "./error";

export const createEthereumAddress = async (): Promise<String> => {
  try {
    const private_key = "0x" + randomBytes(32).toString('hex');    
    const { address } = new Wallet(private_key);

    const entry = await database.ETH_ADDRESS_TABLE.create({
      eth_address: address,
      private_key,
    });
    if (entry) {
      return address
    }
  } catch (err) {
    throw new CreateEthereumAddressError("Unable to create ethereum address");
  }

}