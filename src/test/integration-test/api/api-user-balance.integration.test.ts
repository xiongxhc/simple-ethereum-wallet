import axios from "axios";
import { expect } from "chai";

describe("Test get user balance", () => {
  const url = "http://localhost:3000/api/user/balance";
  it("Can get ethereum balance", async () => {
    const data = {
      eth_address: "0x7eEcfFb050FbB238b5b27dE4100e30FA613d7B71",
      erc_token: "USDT",
    };
    const response = await axios.post(url, data);
    expect(response.data).to.include({ eth_balance: "0.10173636853726589" });
  });

  it("Cannot get ethereum balance when invalid address", async () => {
    const data = {
      eth_address: "fake-eth-address",
      erc_token: "USDT",
    };
    await axios.post(url, data).catch((err) => {
      console.log(err);
      expect(err.response.data).to.deep.equal({
        message: "Invalid ethererum address: fake-eth-address",
      });
    });
  });
});
